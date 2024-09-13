<script>
	// @ts-nocheck
	import Map from '$lib/components/Map.svelte';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;
</script>

<div class="relative">
	<Map></Map>

	<div
		class="absolute bottom-0 left-0 right-0 mx-8 mb-4 bg-white p-2 flex justify-between items-center shadow-lg rounded-lg"
	>
		<div class="text-center text-white bg-[#18294E] px-2 py-1.5 rounded-lg">
			<div class="text-3xl font-bold">{data.totalAsset}</div>
			<div class="text-sm font-semibold">Total Assets</div>
		</div>
		<div class="flex justify-around w-1/2">
			<div class="text-center">
				<div class="text-3xl font-bold">{data.totalLand}</div>
				<div class="text-sm font-semibold">Lands</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold">{data.totalBuilding}</div>
				<div class="text-sm font-semibold">Buildings</div>
			</div>
			<div class="text-center">
				<div class="text-3xl font-bold">{data.totalApartmentRoom}</div>
				<div class="text-sm font-semibold">Apartment Rooms</div>
			</div>
		</div>
		<div>
			<button
				class="bg-[#18294E] text-lg text-white font-semibold py-5 px-10 rounded-lg hover:bg-[#152140] transition duration-200"
				on:click={() => goto('/surveyor/assign')}
			>
				Survey Asset
			</button>
		</div>
	</div>
</div>
