<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	const transactionRequests = data.transactionRequests;

	function goToDetails(id) {
		goto(`/user/transaction/detail/${id}`);
	}

	function formatTimeStamp(dateString) {
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
		const formattedTime = date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		});
		return `${formattedDate}, ${formattedTime}`;
		// return `${formattedDate}`;
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="w-full bg-gray-100 space-y-4 py-4" style="min-height: calc(100vh - 117.6px);">
	{#each transactionRequests as transactionReq}
		<button
			class="bg-white p-6 border rounded-lg shadow flex justify-between mx-auto w-11/12"
			on:click={() => goToDetails(transactionReq.id_transaksi_jual_sewa)}
		>
			<div class="text-start">
				<h3 class="text-2xl font-bold text-[#18294E]">{transactionReq.nama_aset}</h3>
				<p class="text-[#18294E] text-md">{transactionReq.nama_lengkap}</p>
			</div>
			<div class="flex {transactionReq.status === 'W' ? '' : 'my-auto'}">
				{#if transactionReq.status === 'W'}
					<p class="text-md text-[#18294E] font-medium">{formatTimeStamp(transactionReq.created_at)}</p>
				{:else if transactionReq.status === 'A'}
					<p class="text-md text-[#18294E] font-bold">ACCEPTED</p>
				{:else if transactionReq.status === 'D'}
					<p class="text-md text-red-600 font-bold">DECLINED</p>
				{/if}
			</div>
		</button>
	{/each}
</div>
