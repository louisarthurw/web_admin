<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	const surveyRequests = data.surveyRequests;

	let searchQuery = '';
	let filteredSurveyRequests = surveyRequests;

	let currentPage = 1;
	let itemsPerPage = 9;
	let totalPages = Math.ceil(filteredSurveyRequests.length / itemsPerPage);

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredSurveyRequests = surveyRequests;
		} else {
			filteredSurveyRequests = surveyRequests.filter((surveyReq) =>
				`${surveyReq.name}`.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		currentPage = 1;
		totalPages = Math.ceil(filteredSurveyRequests.length / itemsPerPage);
	}

	$: paginatedSurveyRequests = filteredSurveyRequests.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: startEntry = itemsPerPage > 0 ? (currentPage - 1) * itemsPerPage + 1 : (currentPage - 1) * itemsPerPage;
	$: endEntry = Math.min(currentPage * itemsPerPage, filteredSurveyRequests.length);

	function goToPage(pageNumber) {
		currentPage = pageNumber;
	}
	
	function handleAssetClick(id) {
		goto(`/aset/verif/detail/${id}`);
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="container mx-auto py-4 w-full">
	<div class="flex w-[90vw] mx-auto mb-4">
		<input
			type="text"
			placeholder="Search Asset"
			bind:value={searchQuery}
			on:input={handleSearch}
			class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
		/>
	</div>

	<div class="flex justify-center">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr>
					<th class="py-2 text-[#18294E]">Status</th>
					<th class="py-2 text-[#18294E]">Asset Name</th>
					<th class="py-2 text-[#18294E]">Location</th>
					<th class="py-2 text-[#18294E]">Surveyor</th>
					<th class="py-2 text-[#18294E]">Verification</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedSurveyRequests as surveyRequest, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4">
							<div class="w-8 h-8 mx-auto rounded-full flex items-center justify-center">
								{#if surveyRequest.data_lengkap === 'Y'}
									<div class="w-1/2 h-1/2 rounded-full bg-[#00FF38]"></div>
								{:else if surveyRequest.data_lengkap === 'N'}
									<div class="w-1/2 h-1/2 rounded-full bg-[#FFF500]"></div>
								{/if}
							</div>
						</td>
						<td class="py-2 px-4 font-semibold text-[#18294E]">
							<button
								on:click={() => handleAssetClick(surveyRequest.id_transaksi_jual_sewa)}
								class="cursor-pointer focus:outline-none font-semibold text-[#18294E]"
							>
								{surveyRequest.nama_asset}
							</button>
						</td>
						<td class="py-2 px-4">{surveyRequest.alamat}</td>
						<td class="py-2 px-4">{surveyRequest.nama_lengkap}</td>
						<td class="py-2 px-4">
							{#if surveyRequest.status_verifikasi === 'V'}
								<input
									type="checkbox"
									checked
									disabled
									class="w-5 h-5 rounded-sm bg-transparent appearance-none border-[#00FF38] checked:bg-[#00FF38] focus:outline-none focus:ring-0 focus:ring-offset-0"
								/>
							{:else if surveyRequest.status_verifikasi === 'N'}
								<input
									type="checkbox"
									disabled
									class="w-5 h-5 rounded-sm bg-transparent appearance-none border-[#00FF38] checked:bg-[#00FF38] focus:outline-none focus:ring-0 focus:ring-offset-0"
								/>
							{:else if surveyRequest.status_verifikasi === 'R'}
								<button
									class="px-2 py-1 text-sm font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md"
									disabled
								>
									RESURVEY
								</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-between mt-2 w-[90vw] mx-auto">
		<span class="text-[#18294E] font-medium">
			Showing {startEntry} to {endEntry} of {filteredSurveyRequests.length} entries
		</span>

		<div class="flex space-x-1">
			{#each Array(totalPages) as _, i}
				<button
					class="px-3 py-1 rounded-lg {currentPage === i + 1
						? 'bg-[#18294E] text-white'
						: 'bg-gray-200 text-gray-600'}"
					on:click={() => goToPage(i + 1)}
				>
					{i + 1}
				</button>
			{/each}
		</div>
	</div>
</div>
