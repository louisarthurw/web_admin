<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navbar5 from '$lib/components/Navbar5.svelte';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { server, auth } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const asset = data.asset;
	const allAsset = data.allAsset;
	const serverDetails = get(server);

	function getParentAsset(id) {
		const asset = allAsset.find((a) => a.id_asset === id);
		return asset.nama;
	}

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="px-8 sm:px-4 py-4">
	<h2 class="text-[#18294E] text-2xl font-bold mb-2">
		{#if asset.id_asset_parent}
			{asset.nama} [Bagian dari {getParentAsset(asset.id_asset_parent)}]
		{:else}
			{asset.nama}
		{/if}
	</h2>
	<div class="flex space-x-4 overflow-x-auto">
		{#if asset.link_gambar}
			{#each asset.link_gambar as gambar, i}
				<img
					src={asset.link_gambar
						? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`
						: '/asset.jpg'}
					alt="{asset.nama} image {i + 1}"
					class="w-64 h-64 object-cover rounded-md"
				/>
			{/each}
		{/if}
	</div>
</div>

<Navbar5 currentPage={$page.url.pathname}></Navbar5>

<div class="px-8 sm:px-4 py-6 flex flex-col" style="min-height: calc(100vh - 490.4px)">
	<form
		class="flex flex-col flex-grow"
		action="?/changeAccess"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil edit access!',
						text: result.data.message
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal edit access!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div class="flex flex-col space-y-4 font-medium text-xl">
			<label class="flex items-center space-x-2">
				<input
					type="radio"
					name="access"
					value="Y"
					bind:group={asset.status_publik}
					class="text-[#18294E] focus:ring-0 focus:outline-none"
				/>
				<span class="text-[#18294E]">Ditawarkan</span>
			</label>
			<label class="flex items-center space-x-2">
				<input
					type="radio"
					name="access"
					value="N"
					bind:group={asset.status_publik}
					class="text-[#18294E] focus:ring-0 focus:outline-none"
				/>
				<span class="text-[#18294E]">Tidak ditawarkan</span>
			</label>
		</div>

		<div class="flex-grow"></div>

		<div class="flex justify-between pt-4">
			<div class="w-5/12"></div>
			{#if privilege_id.includes(14)}
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4 text-lg"
				>
					SAVE
				</button>
			{/if}
			<div class="w-5/12"></div>
		</div>
	</form>
</div>
