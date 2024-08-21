<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';

	let searchQuery = '';
	let filteredAssets = assets;

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredAssets = assets;
		} else {
			filteredAssets = assets.filter((asset) =>
				`${asset.name}`.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}

	function goToDetails(id) {
		goto(`/aset/manage/overview/${id}`);
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="container mx-auto mt-4">
	<div class="flex flex-col items-center justify-center w-full">
		<div class="flex items-center w-[90vw] mb-4">
			<input
				type="text"
				placeholder="Search Asset"
				bind:value={searchQuery}
				on:input={handleSearch}
				class="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			<button
				class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
				on:click={() => goto('/aset/manage/add')}>Add Asset</button
			>
		</div>

		{#each filteredAssets as asset}
			<button
				class="flex w-[90vw] bg-white p-4 border rounded-lg shadow mb-4"
				on:click={() => goToDetails(asset.id)}
			>
				<img src={asset.image} alt={asset.name} class="w-24 h-24 rounded-lg mr-6 object-cover" />

				<div class="flex flex-col text-left h-24 justify-center">
					<p class="text-[#18294E] font-bold text-2xl">{asset.name}</p>
					<p class="text-[#18294E] text-lg">{asset.location}</p>
					<p class="text-[#18294E] text-lg">
						Status: <span class="font-bold">{asset.statusAsset}</span>
					</p>
				</div>
			</button>
		{/each}
	</div>
</div>
