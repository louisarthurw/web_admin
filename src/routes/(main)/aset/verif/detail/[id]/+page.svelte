<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';

	let name = '';
	let assetId = '';
	let location = '';
	let coordinate = '';
	let type = '';
	let totalArea = '';
	let totalValue = '';
	let condition = '';
	let coordinateBoundaries = '';

	let id = $page.params.id;
	let asset = assets.find((a) => a.id == id);

	if (asset) {
		name = asset.name;
		assetId = asset.assetId;
		location = asset.location;
		coordinate = asset.coordinate;
		type = asset.type;
		totalArea = asset.totalArea + ' m²';
		totalValue = "Rp. " + asset.totalValue.toLocaleString('id-ID');
		condition = asset.condition;
		coordinateBoundaries = asset.coordinateBoundaries;
	}

	function back() {
		goto(`/aset/verif`);
	}

	function reassign() {
		goto(`/surveyor/assign`);
	}

	function verificate(id) {
		const asset = assets.find((asset) => asset.id === id);
		console.log(asset.id);
		console.log(id);
		console.log(asset);
		if (asset) {
			asset.verification = 'ok';
			goto(`/aset/verif`);
		}
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{name}</h1>
	<form class="space-y-2">
		<div>
			<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
			<input
				id="assetId"
				bind:value={assetId}
				type="text"
				placeholder="Asset ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				bind:value={location}
				type="text"
				placeholder="Location"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinate">Coordinate</label>
			<input
				id="coordinate"
				bind:value={coordinate}
				type="text"
				placeholder="Coordinate"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				bind:value={type}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalArea">Total Area</label>
			<input
				id="totalArea"
				bind:value={totalArea}
				type="text"
				placeholder="Total Area"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalValue">Total Value</label>
			<input
				id="totalValue"
				bind:value={totalValue}
				type="text"
				placeholder="Total Value"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="condition">Condition</label>
			<textarea
				id="condition"
				bind:value={condition}
				type="text"
				placeholder="Condition"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="3"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinateBoundaries"
				>Coordinate Boundaries</label
			>
			<textarea
				id="coordinateBoundaries"
				bind:value={coordinateBoundaries}
				type="text"
				placeholder="Coordinate Boundaries"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				disabled
			/>
		</div>
		<div class="flex justify-between pt-8">
			{#if asset.verification === '-'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				<button
					type="button"
					on:click={() => verificate(asset.id)}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					VERIFICATE
				</button>
				<div class="w-1/3"></div>
			{:else if asset.verification === 'ok'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					BACK
				</button>
				<div class="w-1/3"></div>
			{:else if !asset.verification}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				<button
					type="button"
					on:click={reassign}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					RE-ASSIGN
				</button>
				<div class="w-1/3"></div>
			{/if}
		</div>
	</form>
</div>
