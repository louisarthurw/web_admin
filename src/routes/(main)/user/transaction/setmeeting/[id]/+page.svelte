<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { transactions } from '$lib/transaction';
	import { goto } from '$app/navigation';

	let transactionId = $page.params.id;
	let transaction = transactions.find((t) => t.id == transactionId);

	let inputDate = '';
	let inputTime = '';
	let inputPlace = '';

	function handleSubmit() {
		if (!inputDate || !inputTime || !inputPlace) {
			alert('Harap isi semua input field!');
			return;
		}

		goto('/user/transaction');
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>
<div
	class="flex flex-col items-center justify-center bg-gray-100"
	style="min-height: calc(100vh - 117.6px);"
>
	<div class="bg-white rounded-lg shadow-lg p-6 w-5/6 h-[60vh] flex flex-col justify-between">
		<div class="flex justify-between items-start mb-4">
			<div>
				<h1 class="text-2xl font-bold text-[#18294E] leading-tight">{transaction.assetName}</h1>
				<p class="text-lg font-semibold text-[#18294E]">{transaction.name}</p>
				<p class="text-md font-medium text-[#18294E]">@{transaction.username}</p>
			</div>
			<div class="text-right">
				<p class="text-lg font-medium text-[#18294E]">{transaction.transactionDate}</p>
				<p class="text-lg font-medium text-[#18294E]">{transaction.time}</p>
			</div>
		</div>

		<div class="space-y-2">
			<input
				type="text"
				bind:value={inputDate}
				placeholder="Input Date dd/mm/yyyy"
				class="w-full px-4 py-3 text-md border rounded-md border-[#18294E] text-[#18294E] focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
			<input
				type="text"
				bind:value={inputTime}
				placeholder="Input Time xx : yy"
				class="w-full px-4 py-3 text-md border rounded-md border-[#18294E] text-[#18294E] focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
			<input
				type="text"
				bind:value={inputPlace}
				placeholder="Input Place"
				class="w-full px-4 py-3 text-md border rounded-md border-[#18294E] text-[#18294E] focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
	</div>

	<button
		on:click={handleSubmit}
		class="mt-8 w-1/6 py-4 bg-[#18294E] text-white text-sm font-semibold rounded-md hover:bg-[#152140] transition duration-200"
	>
		SEND
	</button>
</div>
