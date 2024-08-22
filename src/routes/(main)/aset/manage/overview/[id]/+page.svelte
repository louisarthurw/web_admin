<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';
	import Navbar5 from '$lib/components/Navbar5.svelte';

	let assetId = $page.params.id;
	let asset = assets.find((a) => a.id == assetId);

	let activeChildAssets = asset.child.filter(child => child.status === 'active');

	function createChild(id) {
		goto(`/aset/manage/createchild/${id}`);
	}

	function joinChild(id) {
		goto(`/aset/manage/joinchild/${id}`);
	}

	function editChild(childId) {
		goto(`/aset/manage/editchild/${assetId}/${childId}`);
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="px-8 sm:px-4 py-4">
	<h2 class="text-[#18294E] text-2xl font-bold mb-2">{asset.name}</h2>
	<div class="flex space-x-4">
		{#each Array(5) as _, i}
			<img
				src={asset.image}
				alt="{asset.name} image {i + 1}"
				class="w-64 h-64 object-cover rounded-md"
			/>
		{/each}
	</div>
</div>

<Navbar5 currentPage={$page.url.pathname}></Navbar5>

<div class="bg-gray-100">
	<div class="p-4 space-y-2 text-lg text-[#18294E] font-medium">
		<div class="flex">
			<span class="min-w-[190px]">Asset ID</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.assetId}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Location</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.location}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Type</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.type}</span>
		</div>
		{#if asset.child.length === 0}
			<div class="flex">
				<span class="min-w-[190px]">Usage</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.usage}</span>
			</div>
			<div class="flex">
				<span class="min-w-[190px]">Tags</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.tags}</span>
			</div>
		{/if}
		<div class="flex">
			<span class="min-w-[190px]">Legality Letter</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.legalityLetter}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Legality Number</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.legalityNumber}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Legality File</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.legalityFile}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Power of Attorney</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.powerOfAttorney}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Total Area</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.totalArea} m²</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Coordinate Boundaries</span>
			<span class="ml-2 mr-4">:</span>
			<div>
				{#each asset.coordinateBoundaries.split('\n') as boundary}
					<div>{boundary}</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="p-4 text-lg text-[#18294E] font-medium">
		{#if activeChildAssets.length > 0}
			<h2 class="text-[#18294E] text-2xl font-bold mb-2">Child</h2>
			<ul class="list-disc pl-5 space-y-4">
				{#each activeChildAssets as childAsset}
					<li class="p-4 bg-white rounded-lg cursor-pointer" on:click={() => editChild(childAsset.assetId)}>
						<ul class="space-y-2">
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Asset ID</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.assetId}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Name</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.name}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Type</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.type}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Status</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.statusAsset}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality Letter</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.legalityLetter}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality Number</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.legalityNumber}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality File</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.legalityFile}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Power of Attorney</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.powerOfAttorney}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Tags</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.tags}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Utility</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.usage}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Value</span>
								<span class="ml-2 mr-4">:</span>
								<span>Rp {childAsset.totalValue.toLocaleString('id-ID')}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Area</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.totalArea} m²</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Condition</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.condition}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Coordinate Boundaries</span>
								<span class="ml-2 mr-4">:</span>
								<div>
									{#each childAsset.coordinateBoundaries.split('\n') as boundary}
										<p>{boundary}</p>
									{/each}
								</div>
							</li>
						</ul>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="flex justify-between pt-4">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={() => joinChild(assetId)}
			>
				Join Asset ID
			</button>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				on:click={() => createChild(assetId)}
			>
				Add Asset ID
			</button>
			<div class="w-1/3"></div>
		</div>
	</div>
</div>
