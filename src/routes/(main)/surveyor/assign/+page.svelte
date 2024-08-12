<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import MapWithGeocoding from '$lib/components/MapWithGeocoding.svelte';

	let radius = '';
	let surveyorName = '';
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="relative">
	<MapWithGeocoding />

	<div class="absolute bottom-0 left-0 right-0 mx-8 mb-4 rounded-lg z-10">
		<div class="flex justify-between items-center space-x-4">
			<div class="flex items-center w-3/12 bg-white px-4 py-2 rounded-lg">
				<label for="radius" class="font-semibold text-lg mr-2 text-[#18294E]">Radius:</label>
				<input
					id="radius"
					type="number"
					bind:value={radius}
					placeholder="Enter radius"
					class="w-full p-2 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				/>
				<span class="text-lg ml-2 text-[#18294E]">km</span>
			</div>

			<!-- <div class="flex w-1/12"></div> -->

			<div class="flex items-center w-9/12 bg-white px-4 py-2 rounded-lg">
				<label for="surveyorName" class="font-semibold text-lg text-[#18294E] whitespace-nowrap mr-2"
					>Input Surveyor Name:</label
				>
				<input
					id="surveyorName"
					type="text"
					bind:value={surveyorName}
					placeholder="Enter name"
					class="w-full p-2 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				/>
			</div>
		</div>
	</div>
</div>
