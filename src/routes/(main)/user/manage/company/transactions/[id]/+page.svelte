<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { companies } from '$lib/company';
	import { goto } from '$app/navigation';

	let companyId = $page.params.id;
	let company = companies.find((c) => c.id == companyId);

	function handleAddMeeting(transactionIndex) {
		goto(`/user/manage/company/meeting/${company.id}/${transactionIndex}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>
<div
	class={`bg-gray-100 p-6 ${company.transactionDetail.length === 0 ? 'flex items-center justify-center' : ''}`}
	style="min-height: calc(100vh - 117.6px);"
>
	{#if company.transactionDetail.length === 0}
		<p class="text-gray-500 text-2xl">Belum ada transaksi</p>
	{:else}
		<div class="container mx-auto w-[90vw]">
			{#each company.transactionDetail as transaction, index}
				<h2 class="text-[#18294E] text-2xl font-bold mb-2">{transaction.name}</h2>
				<div class="p-4 rounded-md bg-white mb-4">
					{#if transaction.detail}
						{#each transaction.detail as detail, i}
							<div class="mb-4">
								<p class="font-bold text-[#18294E] ml-1 mb-1">{detail.meeting}</p>
								<div class="bg-[#18294E] text-white p-4 rounded-md">
									<div class="grid grid-cols-[auto,1fr] gap-x-4 items-start">
										<div>
											<p class="font-bold">Date</p>
											<p class="font-bold">Time</p>
											<p class="font-bold">Place</p>
											<p class="font-bold">Notes</p>
											<p class="font-bold">File</p>
											<p class="font-bold">File Type</p>
										</div>
										<div>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.date}</span>
											</p>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.time}</span>
											</p>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.place}</span>
											</p>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.notes}</span>
											</p>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.file}</span>
											</p>
											<p class="flex">
												<span class="font-bold mr-2">:</span>
												<span>{detail.fileType}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						{/each}
						<div class="flex justify-end">
							<button
								class="bg-[#18294E] text-white font-bold py-3 px-6 rounded-md"
								on:click={() => handleAddMeeting(index)}
							>
								Add Meeting
							</button>
						</div>
					{:else}
						<p class="text-red-500 font-bold rounded-md">DECLINED</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
