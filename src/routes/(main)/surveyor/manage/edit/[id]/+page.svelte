<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const surveyor = data.surveyor;

	let isShowPassword = false;

	const showPassword = () => {
		isShowPassword = true;
	};

	const hidePassword = () => {
		isShowPassword = false;
	};

	const handleBack = () => {
		goto(`/surveyor/manage`);
	};
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Edit Surveyor</h1>
	<form
		class="space-y-2"
		action="?/editSurveyor"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil edit surveyor!',
						text: result.data.message
					}).then(() => {
						goto('/surveyor/manage');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal edit surveyor!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="surveyor_id">Worker ID</label>
			<input
				id="surveyor_id"
				name="surveyor_id"
				value={surveyor.surveyor_id}
				type="text"
				placeholder="Name"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="nama_lengkap">Name</label>
			<input
				id="nama_lengkap"
				name="nama_lengkap"
				value={surveyor.nama_lengkap}
				type="text"
				placeholder="Name"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				id="username"
				name="username"
				value={surveyor.username}
				type="text"
				placeholder="Username"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="password">Password</label>
			<input
				id="password"
				name="password"
				value={surveyor.password}
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
				id="email"
				name="email"
				value={surveyor.email}
				type="email"
				placeholder="Email"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="no_telp">Phone Number</label>
			<input
				id="no_telp"
				name="no_telp"
				value={surveyor.no_telp}
				type="tel"
				placeholder="Phone Number"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
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
