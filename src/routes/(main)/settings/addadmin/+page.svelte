<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { admins } from '$lib/admin';
	import { roleAdmins } from '$lib/roleAdmin';

	let name = '';
	let username = '';
	let role = '';

	const handleCancel = () => {
		goto('/settings');
	};

	const handleAdd = () => {
		const newAdmin = {
			id: admins.length + 1,
			name,
			username,
			role
		};
		admins.push(newAdmin);
		goto('/settings');
	};
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class="flex flex-col flex-grow bg-gray-100 p-6 space-y-4">
		<h1 class="text-3xl font-bold text-[#18294E]">Add Admin</h1>
		<form class="flex flex-grow flex-col space-y-4" on:submit|preventDefault={handleAdd}>
			<div>
				<h2 class="text-lg font-semibold mb-2">Name</h2>
				<input
					bind:value={name}
					type="text"
					placeholder="Name"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-2">Username</h2>

				<input
					bind:value={username}
					type="text"
					placeholder="Username"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-2">Role</h2>
				<select
					bind:value={role}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {role ===
					''
						? 'text-gray-500'
						: 'text-black'}"
					required
				>
					<option value="" disabled>Choose Role</option>
					{#each roleAdmins as role}
						<option value={role.name}>{role.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex-grow"></div>

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
</div>
