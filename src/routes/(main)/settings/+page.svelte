<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const admins = data.admins;
	const roles = data.roles;
	const classes = data.businessClass;

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class="flex-grow bg-gray-100 p-6 space-y-4">
		{#if privilege_id.includes(24)}
			<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
				<div class="flex justify-between items-center">
					<h3 class="text-[#18294E] text-2xl font-bold">Admin</h3>
					{#if privilege_id.includes(27)}
						<div class="flex space-x-4">
							<button
								class="bg-[#18294E] text-white py-1 px-5 rounded-md"
								on:click={() => goto('/settings/addadmin')}>Add</button
							>
						</div>
					{/if}
				</div>

				<div class="grid grid-cols-2 gap-4 mt-4">
					{#each admins as admin}
						<div class="bg-[#18294E] text-white p-4 rounded-md">
							<div class="flex space-x-4">
								<div class="w-20 h-20 bg-white rounded-full flex items-center justify-center">
									<img src="/default_profile_icon.png" alt="Avatar" />
								</div>

								<div class="flex-grow">
									<div class="flex justify-between items-center">
										<p class="font-semibold text-lg">{admin.nama_lengkap}</p>
										{#if privilege_id.includes(27)}
											<div class="flex space-x-2">
												<!-- <button class="border border-white py-1 px-3 rounded-md font-medium"
											>Delete</button
										> -->

												<button
													class="border border-white py-1 px-3 rounded-md font-medium"
													on:click={() => goto(`/settings/editadmin/${admin.id}`)}>Edit</button
												>
											</div>
										{/if}
									</div>
									<input
										bind:value={admin.user_role}
										type="text"
										class="text-[#18294E] bg-white py-1 px-2 rounded-md mt-1 font-medium"
										disabled
									/>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if privilege_id.includes(25)}
			<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
				<div class="flex justify-between items-center">
					<h3 class="text-[#18294E] text-2xl font-bold">Role</h3>
					{#if privilege_id.includes(28)}
						<div class="flex space-x-4">
							<button
								class="bg-[#18294E] text-white py-1 px-5 rounded-md"
								on:click={() => goto('settings/addrole')}>Add</button
							>
						</div>
					{/if}
				</div>
				<div class="grid grid-cols-2 gap-4 mt-4">
					{#each roles as role}
						<div class="bg-[#18294E] text-white p-4 rounded-md">
							<div class="flex justify-between items-center">
								<p class="font-semibold text-lg">{role.nama_role}</p>
								{#if privilege_id.includes(28)}
									<div class="flex space-x-2">
										<!-- <button class="border border-white py-1 px-3 rounded-md font-medium">Delete</button> -->
										<button
											class="border border-white py-1 px-3 rounded-md font-medium"
											on:click={() => goto(`/settings/editrole/${role.role_id}`)}>Edit</button
										>
									</div>
								{/if}
							</div>
							{#if role.privilege}
								{#each role.privilege as privilege}
									<div class="flex items-center">
										<input
											type="checkbox"
											class="h-4 w-4 rounded text-blue-500 mr-2"
											checked
											disabled
										/>
										<p class="text-white font-medium">{privilege}</p>
									</div>
								{/each}
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if privilege_id.includes(26)}
			<div class="bg-white px-6 py-4 rounded-md border-2 border-black">
				<div class="flex justify-between items-center">
					<h3 class="text-[#18294E] text-2xl font-bold">Class</h3>
					{#if privilege_id.includes(29)}
						<div class="flex space-x-4">
							<button
								class="bg-[#18294E] text-white py-1 px-5 rounded-md"
								on:click={() => goto('settings/addclass')}>Add</button
							>
						</div>
					{/if}
				</div>
				<div class="space-y-4 mt-4">
					{#each classes as businessClass}
						<div class="bg-[#18294E] text-white p-4 rounded-md">
							<div class="flex justify-between items-center">
								<p class="font-semibold text-lg">{businessClass.nama}</p>
								{#if privilege_id.includes(29)}
									<div class="flex space-x-2">
										<!-- <button class="border border-white py-1 px-3 rounded-md font-medium">Delete</button> -->
										<button
											class="border border-white py-1 px-3 rounded-md font-medium"
											on:click={() => goto(`/settings/editclass/${businessClass.id}`)}>Edit</button
										>
									</div>
								{/if}
							</div>

							<div class="flex space-x-2 space-y-2 items-center">
								<p class="text-white font-medium">Rp</p>
								<input
									value={businessClass.modal_minimal.toLocaleString('id-ID')}
									type="text"
									class="text-[#18294E] bg-white py-1 px-2 rounded-md font-medium"
									disabled
								/>
								<p class="text-white font-medium">- Rp</p>
								<input
									value={businessClass.modal_maksimal.toLocaleString('id-ID')}
									type="text"
									class="text-[#18294E] bg-white py-1 px-2 rounded-md font-medium"
									disabled
								/>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
