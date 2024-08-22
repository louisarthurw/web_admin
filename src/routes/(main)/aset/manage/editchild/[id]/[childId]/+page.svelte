<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';
	import Navbar5 from '$lib/components/Navbar5.svelte';

	let id = $page.params.id;
	let asset = assets.find((a) => a.id == id);

	let childId = $page.params.childId;
	let childAsset = asset.child.find((c) => c.assetId == childId);

	let assetId = '';
	let name = '';
	let type = '';
	let statusAsset = '';
	let legalityLetter = '';
	let legalityNumber = '';
	let legalityFile = '';
	let powerOfAttorney = '';
	let tags = '';
	let usage = '';
	let totalValue = '';
	let totalArea = '';
	let condition = '';
	let coordinateBoundaries = '';

	if (childAsset) {
		assetId = childAsset.assetId;
		name = childAsset.name;
		type = childAsset.type;
		statusAsset = childAsset.statusAsset;
		legalityLetter = childAsset.legalityLetter;
		legalityNumber = childAsset.legalityNumber;
		legalityFile = childAsset.legalityFile;
		powerOfAttorney = childAsset.powerOfAttorney;
		tags = childAsset.tags;
		usage = childAsset.usage;
		totalValue = childAsset.totalValue;
		totalArea = childAsset.totalArea;
		condition = childAsset.condition;
		coordinateBoundaries = childAsset.coordinateBoundaries;
	}

	const handleUnmerge = () => {
		if (childAsset && childAsset.idJoin.length > 0) {
			childAsset.idJoin.forEach((joinedId) => {
				let mergedAsset = asset.child.find((c) => c.assetId === joinedId);
				console.log('mergedAsset: ', mergedAsset);
				if (mergedAsset) {
					mergedAsset.status = 'active';
				}
			});
			childAsset.status = 'inactive';
		}
		console.log(asset.child.find((c) => c.assetId == childId));
		goto(`/aset/manage/overview/${id}`);
	};

	const handleSave = () => {
		if (childAsset) {
			childAsset.assetId = assetId;
			childAsset.name = name;
			childAsset.type = type;
			childAsset.statusAsset = statusAsset;
			childAsset.legalityLetter = legalityLetter;
			childAsset.legalityNumber = legalityNumber;
			childAsset.legalityFile = legalityFile;
			childAsset.powerOfAttorney = powerOfAttorney;
			childAsset.tags = tags;
			childAsset.usage = usage;
			childAsset.totalValue = totalValue;
			childAsset.totalArea = totalArea;
			childAsset.condition = condition;
			childAsset.coordinateBoundaries = coordinateBoundaries;
		}
		goto(`/aset/manage/overview/${id}`);
	};

	const handleDelete = () => {
		if (childAsset) {
			asset.child = asset.child.filter((c) => c.assetId !== childId);
		}
		goto(`/aset/manage/overview/${id}`);
	};
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Edit Asset ID</h1>
	<form class="space-y-4" on:submit|preventDefault={handleSave}>
		<div>
			<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
			<input
				bind:value={assetId}
				type="text"
				placeholder="Asset ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="name">Name</label>
			<input
				bind:value={name}
				type="text"
				placeholder="Name"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				bind:value={type}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="usage">Utility</label>
			<input
				bind:value={usage}
				type="text"
				placeholder="Usage"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="tags">Tags</label>
			<input
				bind:value={tags}
				type="text"
				placeholder="Tags"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="legalityLetter">Legality Letter</label>
			<input
				bind:value={legalityLetter}
				type="text"
				placeholder="Legality Letter"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="legalityNumber">Legality Number</label>
			<input
				bind:value={legalityNumber}
				type="text"
				placeholder="Legality Number"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="legalityFile">Legality File</label>
			<input
				bind:value={legalityFile}
				type="text"
				placeholder="Upload Legality File"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="powerOfAttorney">Power of Attorney</label>
			<input
				bind:value={powerOfAttorney}
				type="text"
				placeholder="Upload Power of Attorney"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="statusAsset">Status</label>
			<input
				bind:value={statusAsset}
				type="text"
				placeholder="Status"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="condition">Condition</label>
			<input
				bind:value={condition}
				type="text"
				placeholder="Condition"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinateBoundaries"
				>Coordinate Boundaries</label
			>
			<textarea
				bind:value={coordinateBoundaries}
				type="text"
				placeholder="Coordinate Boundaries"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				rows="4"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalArea">Area</label>
			<input
				bind:value={totalArea}
				type="number"
				placeholder="Area (m²)"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalValue">Value</label>
			<input
				bind:value={totalValue}
				type="number"
				placeholder="Value (Rupiah)"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div class="flex justify-between pt-8">
			<div class={childAsset.idJoin.length > 0 ? 'w-1/4' : 'w-1/3'}></div>
			{#if childAsset.idJoin.length > 0}
				<button
					type="button"
                    on:click={handleUnmerge}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>UNMERGE</button
				>
			{/if}
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>SAVE</button
			>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				on:click={handleDelete}>DELETE</button
			>
			<div class={childAsset.idJoin.length > 0 ? 'w-1/4' : 'w-1/3'}></div>
		</div>
	</form>
</div>
