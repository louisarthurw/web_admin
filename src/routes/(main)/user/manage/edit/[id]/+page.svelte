<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const user = data.user;

	let isShowPassword = false;

	const showPassword = () => {
		isShowPassword = true;
	};

	const hidePassword = () => {
		isShowPassword = false;
	};

	const handleBack = () => {
		goto(`/user/manage`);
	};

	function setCompany(arrayCompanies) {
		if (arrayCompanies === null) {
			return 'Tidak ada company';
		}
		let formattedCompanies = '';
		arrayCompanies.forEach((company, index) => {
			formattedCompanies += `${index + 1}. ${company.nama}\n`;
		});
		return formattedCompanies;
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{user.nama_lengkap}</h1>
	<form
		class="space-y-2"
		action="?/editUser"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil edit user!',
						text: result.data.message
					}).then(() => {
						goto('/user/manage');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal edit user!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="userId">User ID</label>
			<input
				name="userId"
				value={user.id}
				type="text"
				placeholder="User ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				name="username"
				value={user.username}
				type="text"
				placeholder="Username"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="password">Password</label>
			<input
				name="password"
				value={user.password}
				type={isShowPassword ? 'text' : 'password'}
				on:focus={showPassword}
				on:blur={hidePassword}
				placeholder="Password"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="email">Email</label>
			<input
				name="email"
				value={user.email}
				type="email"
				placeholder="Email"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="phoneNumber">Phone Number</label>
			<input
				name="phoneNumber"
				value={user.no_telp}
				type="tel"
				placeholder="Phone Number"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="company">Company</label>
			<textarea
				name="company"
				value={setCompany(user.PerusahaanJoined)}
				type="text"
				placeholder="Company"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				required
				disabled
			/>
		</div>
		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={handleBack}
			>
				BACK
			</button>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>SAVE</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
