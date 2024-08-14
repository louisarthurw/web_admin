<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { verifications } from '$lib/verification.js';
	import { goto } from '$app/navigation';

	function goToDetails(id) {
		goto(`/user/verif/detail/${id}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="w-full bg-gray-100 space-y-4 py-4" style="min-height: calc(100vh - 117.6px);">
	{#each verifications as verification}
		<button
			class="bg-white p-6 border rounded-lg shadow flex justify-between mx-auto w-11/12"
			on:click={() => goToDetails(verification.id)}
		>
			<div class="text-start">
				<h3 class="text-2xl font-bold text-[#18294E]">{verification.companyName}</h3>
				<p class="text-[#18294E] text-md">{verification.name}</p>
			</div>
			<div class="flex">
				<p class="text-md text-[#18294E]">{verification.date}</p>
			</div>
		</button>
	{/each}
</div>
