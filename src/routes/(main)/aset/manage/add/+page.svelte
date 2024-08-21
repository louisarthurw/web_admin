<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';

	let name = '';
	let assetId = '';
	let type = '';
	let usage = '';
	let tags = '';
	let legalityLetter = '';
	let legalityNumber = '';
	let legalityFile = '';
	let powerOfAttorney = '';
	let image = '';
	let statusAsset = '';
	let location = '';
	let condition = '';
	let coordinate = '';
	let coordinateBoundaries = '';
	let totalArea = '';
	let totalValue = '';

	const handleCancel = () => {
		goto('/aset/manage');
	};

	const handleAdd = () => {
		const newAsset = {
			id: assets.length + 1,
			status: '-',
			name,
			assetId,
			location,
			coordinate,
			type,
			usage,
			tags,
			totalArea,
			totalValue,
			condition,
			coordinateBoundaries,
			surveyor: '-',
			verification: 'skip',
			statusAsset,
			image,
			legalityLetter,
			legalityNumber,
			legalityFile,
			powerOfAttorney,
			child: [],
			access: 'Private',
			history: []
		};
		assets.push(newAsset);
		console.log(assets);
		goto('/aset/manage');
	};
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Input Data New Asset</h1>
	<form class="space-y-4" on:submit|preventDefault={handleAdd}>
		<input
			bind:value={name}
			type="text"
			placeholder="Name"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={assetId}
			type="text"
			placeholder="Asset ID"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={type}
			type="text"
			placeholder="Type"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={usage}
			type="text"
			placeholder="Usage"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={tags}
			type="text"
			placeholder="Tags"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={legalityLetter}
			type="text"
			placeholder="Legality Letter"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={legalityNumber}
			type="text"
			placeholder="Legality Number"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={legalityFile}
			type="text"
			placeholder="Upload Legality File"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={powerOfAttorney}
			type="text"
			placeholder="Upload Power of Attorney"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={image}
			type="text"
			placeholder="Upload Image"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>

		<input
			bind:value={statusAsset}
			type="text"
			placeholder="Status"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		
		<input
			bind:value={location}
			type="text"
			placeholder="Location"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={condition}
			type="text"
			placeholder="Condition"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={coordinate}
			type="text"
			placeholder="Coordinate"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<textarea
			bind:value={coordinateBoundaries}
			type="text"
			placeholder="Coordinate Boundaries"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			rows="4"
			required
		/>
		<input
			bind:value={totalArea}
			type="number"
			placeholder="Area (m²)"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={totalValue}
			type="number"
			placeholder="Value (Rupiah)"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>

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
