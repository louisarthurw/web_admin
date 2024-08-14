<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { transactions } from '$lib/transaction.js';
	import { goto } from '$app/navigation';

	function goToDetails(id) {
		goto(`/user/transaction/detail/${id}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="w-full bg-gray-100 space-y-4 py-4" style="min-height: calc(100vh - 117.6px);">
	{#each transactions as transaction}
		<button
			class="bg-white p-6 border rounded-lg shadow flex justify-between mx-auto w-11/12"
			on:click={() => goToDetails(transaction.id)}
		>
			<div class="text-start">
				<h3 class="text-2xl font-bold text-[#18294E]">{transaction.assetName}</h3>
				<p class="text-[#18294E] text-md">{transaction.name}</p>
			</div>
			<div class="flex {transaction.date ? '' : 'my-auto'}">
				{#if transaction.date}
					<p class="text-md text-[#18294E]">{transaction.date}</p>
				{:else}
					<button class="bg-[#18294E] text-white px-4 py-2 rounded-lg">Set Another Meeting</button>
				{/if}
			</div>
		</button>
	{/each}
</div>
