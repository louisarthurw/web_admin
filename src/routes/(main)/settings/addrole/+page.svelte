<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const privileges = data.privileges;

	let selectedPrivilege = [];

	const handleCancel = () => {
		goto('/settings');
	};
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class="flex flex-col flex-grow bg-gray-100 p-6 space-y-4">
		<h1 class="text-3xl font-bold text-[#18294E]">Add Role</h1>
		<form
			class="flex flex-grow flex-col space-y-4"
			action="?/addRole"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update({ reset: false });

					if (result.status === 200) {
						Swal.fire({
							icon: 'success',
							title: 'Berhasil Add Role!',
							text: result.data.message
						}).then(() => {
							goto('/settings');
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Gagal Add Role!',
							text: result.data.message
						});
					}
				};
			}}
		>
			<div>
				<h2 class="text-lg font-semibold mb-2">Role</h2>
				<input
					name="nama"
					type="text"
					placeholder="Role Name"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
				/>
			</div>

			<div>
				<h2 class="text-lg font-semibold mb-2">Privileges</h2>
				<div class="grid grid-cols-4 gap-4">
					{#each privileges as privilege}
						<div class="flex items-center">
							<input
								type="checkbox"
								value={privilege.privilege_id}
								class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
								on:change={(e) => {
									if (e.target.checked) {
										selectedPrivilege.push(privilege.privilege_id);
										selectedPrivilege = selectedPrivilege.sort((a, b) => a - b);
									} else {
										selectedPrivilege = selectedPrivilege.filter(
											(p) => p !== privilege.privilege_id
										);
										selectedPrivilege = selectedPrivilege.sort((a, b) => a - b);
									}
								}}
							/>
							<input type="hidden" name="privilege" value={selectedPrivilege} />
							<span class="ml-2">{privilege.nama_privilege}</span>
						</div>
					{/each}
				</div>
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
