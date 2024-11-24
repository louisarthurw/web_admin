<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navbar5 from '$lib/components/Navbar5.svelte';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const asset = data.asset;
	const allAsset = data.allAsset;
	const history = data.history;
	console.log(asset);
	console.log(history);

	const serverDetails = get(server);

	// let assetId = $page.params.id;
	// let asset = assets.find((a) => a.id == assetId);

	function getParentAsset(id) {
		const asset = allAsset.find((a) => a.id_asset === id);
		return asset.nama;
	}

	function getAssetType(type) {
		switch (type) {
			case 'B':
				return 'Building';
			case 'L':
				return 'Land';
			case 'A':
				return 'Apart';
			default:
				return 'Unknown';
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	}
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
						? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar.link_gambar}`
						: '/asset.jpg'}
					alt="{asset.nama} image {i + 1}"
					class="w-64 h-64 object-cover rounded-md"
				/>
			{/each}
		{/if}
	</div>
</div>

<Navbar5 currentPage={$page.url.pathname}></Navbar5>

<div
	class="bg-gray-100 {!history ? 'flex items-center justify-center' : ''}"
	style="min-height: calc(100vh - 490.4px)"
>
	{#if history}
		<div class="p-4 space-y-2 text-lg text-[#18294E] font-medium">
			<div class="flex">
				<span class="min-w-[120px]">Asset ID</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.id_asset}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Location</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.alamat}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Type</span>
				<span class="ml-2 mr-4">:</span>
				<span>{getAssetType(asset.tipe)}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Total Area</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.luas} m²</span>
			</div>

			<div class="flex">
				<span class="min-w-[120px]">Verification</span>
				<span class="ml-2 mr-4">:</span>
				{#if asset.status_verifikasi === 'N'}
					<span><p class="font-bold text-red-600">WAITING</p></span>
				{:else}
					<span><p class="font-bold text-[#00FF38]">DONE</p></span>
				{/if}
			</div>
		</div>

		<div class="p-4 text-lg text-[#18294E] font-medium">
			<h2 class="text-[#18294E] text-2xl font-bold mb-2">Survey</h2>
			<ul class="list-disc pl-5 space-y-4">
				{#each history as surveyHistory, index}
					<li class="p-4 bg-white rounded-lg space-y-4">
						<p class="flex text-2xl font-bold">
							Survey {index + 1}
						</p>
						<ul class="space-y-2">
							<li class="flex">
								<span class="min-w-[110px] font-semibold">Updated on</span>
								<span class="ml-2 mr-4">:</span>
								<span>{formatDate(surveyHistory.updatedon)}</span>
							</li>
							<li class="flex">
								<span class="min-w-[110px] font-semibold">Value</span>
								<span class="ml-2 mr-4">:</span>
								<div>
									<p>{surveyHistory.value_name}</p>
									<p>
										Rp {surveyHistory.value_old.toLocaleString('id-ID')} &#8594 Rp {surveyHistory.value_new.toLocaleString(
											'id-ID'
										)}
									</p>
								</div>
							</li>
							<li class="flex">
								<span class="min-w-[110px] font-semibold">Condition</span>
								<span class="ml-2 mr-4">:</span>
								<span>{surveyHistory.kondisi_old} &#8594 {surveyHistory.kondisi_new}</span>
							</li>
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<p class="text-lg text-[#18294E] font-semibold">Asset ini belum pernah disurvey!</p>
	{/if}
</div>
