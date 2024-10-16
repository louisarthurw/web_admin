<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const admin = data.user;
	const serverDetails = get(server);
	console.log(admin)

	let isEditing = false;

	function enableEditing() {
		isEditing = true;
	}

	let isShowPassword = false;

	const showPassword = () => {
		isShowPassword = true;
	};

	const hidePassword = () => {
		isShowPassword = false;
	};
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class=" flex-grow bg-gray-100 px-6 py-4 space-y-4">
		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-4">
					<img
						src={admin.foto_profil
							? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${admin.foto_profil}`
							: '/default_profile_icon.png'}
						alt="avatar"
						class="w-24 h-24 rounded-full"
					/>
					<div class="text-[#18294E]">
						<h2 class="text-lg font-bold">{admin.nama_lengkap}</h2>
						<p class="font-medium">{admin.user_role.nama_role}</p>
						<p>@{admin.username}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<form
				action="?/editProfile"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });

						if (result.status === 200) {
							Swal.fire({
								icon: 'success',
								title: 'Berhasil Edit Profile!',
								text: result.data.message
							}).then(() => {
								isEditing = false;
							});
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Gagal Edit Profile!',
								text: result.data.message
							});
						}
					};
				}}
			>
				<div class="flex justify-between items-center">
					<h3 class="text-[#18294E] text-2xl font-bold">Personal Information</h3>
					<div class="flex space-x-4">
						{#if isEditing}
							<button type="submit" class="bg-[#18294E] text-white py-1 px-5 rounded-md"
								>Save</button
							>
						{:else}
							<button on:click={enableEditing} class="bg-[#18294E] text-white py-1 px-5 rounded-md"
								>Edit</button
							>
						{/if}
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4 mt-2">
					<div>
						<label for="name" class="text-gray-500">Name</label>
						<input
							name="nama"
							type="text"
							value={admin.nama_lengkap}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							required
						/>
					</div>
					<div>
						<label for="workerId" class="text-gray-500">Worker ID</label>
						<input
							name="worker_id"
							type="text"
							value={admin.id}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							readonly={isEditing}
						/>
					</div>
					<div>
						<label for="email" class="text-gray-500">Email</label>
						<input
							name="email"
							type="email"
							value={admin.email}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							required
						/>
					</div>
					<div>
						<label for="username" class="text-gray-500">Username</label>
						<input
							name="username"
							type="text"
							value={admin.username}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							required
						/>
					</div>
					<div>
						<label for="phoneNumber" class="text-gray-500">Phone Number</label>
						<input
							name="phone_number"
							type="text"
							value={admin.no_telp}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							required
						/>
					</div>
					<div>
						<label for="password" class="text-gray-500">Password</label>
						<input
							name="password"
							type={isShowPassword ? 'text' : 'password'}
							on:focus={showPassword}
							on:blur={hidePassword}
							value={admin.password}
							class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							disabled={!isEditing}
							required
						/>
					</div>
				</div>
			</form>
		</div>

		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<h3 class="text-[#18294E] text-2xl font-bold">Privileges</h3>
			<div class="grid grid-cols-2 gap-4 mt-4">
				{#if admin.user_role.privilege}
					{#each admin.user_role.privilege as privilege}
						<div class="flex items-center">
							<input
								type="checkbox"
								class=" h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none mr-2"
								checked
								disabled={!isEditing}
							/>
							<p class="text-[#18294E] font-medium">{privilege.nama_privilege}</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
