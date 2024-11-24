<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	const verifRequests = data.verifRequests
	const companyVerifRequests = verifRequests.perusahaan
	// const userVerifRequests = verifRequests.users
	// console.log(userVerifRequests)

	function goToDetails(id) {
		goto(`/user/verif/detail/${id}`);
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
	{#each companyVerifRequests as companyVerifReq}
		<button
			class="bg-white p-6 border rounded-lg shadow flex justify-between mx-auto w-11/12"
			on:click={() => goToDetails(companyVerifReq.id_perusahaan)}
		>
			<div class="text-start">
				<h3 class="text-2xl font-bold text-[#18294E]">{companyVerifReq.nama}</h3>
				<p class="text-[#18294E] text-md">{companyVerifReq.namalengkapuser}</p>
			</div>
			<div class="flex {companyVerifReq.status === 'W' ? '' : 'my-auto'}">
				{#if companyVerifReq.status === 'W'}
					<p class="text-md text-[#18294E] font-medium">{formatTimeStamp(companyVerifReq.created_at)}</p>
				{:else if companyVerifReq.status === 'A'}
					<p class="text-md text-[#18294E] font-bold">ACCEPTED</p>
				{:else if companyVerifReq.status === 'D'}
					<p class="text-md text-red-600 font-bold">DECLINED</p>
				{/if}
			</div>
		</button>
	{/each}
</div>
