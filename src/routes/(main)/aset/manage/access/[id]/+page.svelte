<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';
	import Navbar5 from '$lib/components/Navbar5.svelte';

	let assetId = $page.params.id;
	let asset = assets.find((a) => a.id == assetId);

	let access = asset.access;

	function saveChanges() {
		asset.access = access;
		alert('berhasil update access!');
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="px-8 sm:px-4 pt-4 pb-4">
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

<div
	class="px-8 sm:px-4 py-6 flex flex-col justify-between"
	style="min-height: calc(100vh - 490.4px)"
>
	<div class="flex-grow flex flex-col space-y-4 font-medium text-xl">
		<label class="flex items-center space-x-2">
			<input
				type="radio"
				name="access"
				value="Public"
				bind:group={access}
				class="text-[#18294E] focus:ring-0 focus:outline-none"
			/>
			<span class="text-[#18294E]">Ditawarkan</span>
		</label>
		<label class="flex items-center space-x-2">
			<input
				type="radio"
				name="access"
				value="Private"
				bind:group={access}
				class="text-[#18294E] focus:ring-0 focus:outline-none"
			/>
			<span class="text-[#18294E]">Tidak ditawarkan</span>
		</label>
	</div>

	<div class="flex justify-between pt-4">
		<div class="w-5/12"></div>
		<button
			type="button"
			class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4 text-lg"
			on:click={saveChanges}
		>
			SAVE
		</button>
		<div class="w-5/12"></div>
	</div>
</div>
