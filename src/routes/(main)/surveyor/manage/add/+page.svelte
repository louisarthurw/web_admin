<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	let isShowPassword = false;

	const showPassword = () => {
		isShowPassword = true;
	};

	const hidePassword = () => {
		isShowPassword = false;
	};

	const handleCancel = () => {
		goto('/surveyor/manage');
	};
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Input Data New Surveyor</h1>
	<form
		class="space-y-4"
		action="?/addSurveyor"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil add surveyor!',
						text: result.data.message
					}).then(() => {
						goto('/surveyor/manage');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal add surveyor!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<input
			type="text"
			name="nama_lengkap"
			placeholder="Name"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			type="tel"
			name="no_telp"
			placeholder="Phone Number"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			type="text"
			name="username"
			placeholder="Username"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			type={isShowPassword ? 'text' : 'password'}
			on:focus={showPassword}
			on:blur={hidePassword}
			name="password"
			placeholder="Password"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				on:click={handleCancel}
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>CANCEL</button
			>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>ADD</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
