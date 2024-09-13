<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { adminDatas } from '$lib/adminData';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';

	const authValue = get(auth);

	let id = authValue.id;
	let admin = adminDatas.find((a) => a.id == id);

	let isEditing = false;

	let editedAdmin = { ...admin };

	function enableEditing() {
		isEditing = true;
	}

	function saveChanges() {
		isEditing = false;
		admin.name = editedAdmin.name
		admin.email = editedAdmin.email
		admin.username = editedAdmin.username
		admin.phoneNumber = editedAdmin.phoneNumber
		admin.password = editedAdmin.password
		console.log('Saved changes: ', admin);
	}
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class=" flex-grow bg-gray-100 px-6 py-4 space-y-4">
		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<div class="flex justify-between items-center">
				<div class="flex items-center space-x-4">
					<img src="/default_profile_icon.png" alt="avatar" class="w-24 h-24 rounded-full" />
					<div class="text-[#18294E]">
						<h2 class="text-lg font-bold">{admin.name}</h2>
						<p class="font-medium">{admin.role}</p>
						<p>@{admin.username}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<div class="flex justify-between items-center">
				<h3 class="text-[#18294E] text-2xl font-bold">Personal Information</h3>
				<div class="flex space-x-4">
					{#if isEditing}
						<button on:click={saveChanges} class="bg-[#18294E] text-white py-1 px-5 rounded-md"
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
						type="text"
						bind:value={editedAdmin.name}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						disabled={!isEditing}
					/>
				</div>
				<div>
					<label for="workerId" class="text-gray-500">Worker ID</label>
					<input
						type="text"
						value={admin.workerId}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium"
						disabled
					/>
				</div>
				<div>
					<label for="email" class="text-gray-500">Email</label>
					<input
						type="email"
						bind:value={editedAdmin.email}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						disabled={!isEditing}
					/>
				</div>
				<div>
					<label for="username" class="text-gray-500">Username</label>
					<input
						type="text"
						bind:value={editedAdmin.username}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						disabled={!isEditing}
					/>
				</div>
				<div>
					<label for="phoneNumber" class="text-gray-500">Phone Number</label>
					<input
						type="text"
						bind:value={editedAdmin.phoneNumber}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						disabled={!isEditing}
					/>
				</div>
				<div>
					<label for="password" class="text-gray-500">Password</label>
					<input
						type="password"
						bind:value={editedAdmin.password}
						class="border rounded-md p-2 w-full text-[#18294E] font-medium focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						disabled={!isEditing}
					/>
				</div>
			</div>
		</div>

		<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
			<h3 class="text-[#18294E] text-2xl font-bold">Privileges</h3>
			<div class="grid grid-cols-2 gap-4 mt-4">
				{#each admin.privilege as privilege}
					<div class="flex items-center">
						<input
							type="checkbox"
							class=" h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none mr-2"
							checked
							disabled={!isEditing}
						/>
						<p class="text-[#18294E] font-medium">{privilege}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
