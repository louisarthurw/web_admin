<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	export let data;
	const surveyRequests = data.surveyRequests;
	// console.log(surveyRequests);

	let searchQuery = '';
	let filteredSurveyRequests = surveyRequests.slice().sort(sortByStatusAndDateline);

	let currentPage = 1;
	let itemsPerPage = 9;
	let totalPages = Math.ceil(filteredSurveyRequests.length / itemsPerPage);

	function sortByStatusAndDateline(a, b) {
		if (a.status_request === 'O' && b.status_request === 'O') {
			return new Date(a.dateline) - new Date(b.dateline);
		}
		if (a.status_request === 'F' && b.status_request === 'F') {
			return new Date(a.dateline) - new Date(b.dateline);
		}
		if (a.status_request === 'O' && b.status_request === 'F') return -1;
		if (a.status_request === 'F' && b.status_request === 'O') return 1;
		return 0;
	}

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredSurveyRequests = surveyRequests.slice().sort(sortByStatusAndDateline);
		} else {
			filteredSurveyRequests = surveyRequests
				.filter(
					(request) =>
						request.nama_asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
						request.status_request.toLowerCase().includes(searchQuery.toLowerCase()) ||
						request.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase())
					// request.status_request === 'O'
					// 	? formatDate(request.dateline).toLowerCase().includes(searchQuery.toLowerCase())
					// 	: '-'
				)
				.sort(sortByStatusAndDateline);
		}
	}

	function formatDate(dateString) {
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', options);
	}

	$: paginatedSurveyRequests = filteredSurveyRequests.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: startEntry = (currentPage - 1) * itemsPerPage + 1;
	$: endEntry = Math.min(currentPage * itemsPerPage, filteredSurveyRequests.length);

	function goToPage(pageNumber) {
		currentPage = pageNumber;
	}

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="container mx-auto py-4">
	<div class="flex items-center mb-4 justify-center w-full">
		<div class="flex items-center w-[90vw]">
			<input
				type="text"
				placeholder="Search Task List"
				bind:value={searchQuery}
				on:input={handleSearch}
				class="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			{#if privilege_id.includes(2)}
				<button
					class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
					on:click={() => goto('/surveyor/tasklist/assign')}
				>
					Assign Surveyor
				</button>
			{/if}
		</div>
	</div>
	<div class="flex justify-center">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr class="text-left">
					<th class="py-2 px-4 text-[#18294E]">Asset Name</th>
					<th class="py-2 px-4 text-[#18294E]">Address</th>
					<th class="py-2 px-4 text-[#18294E]">Surveyor Name</th>
					<th class="py-2 px-4 text-[#18294E]">Status</th>
					<th class="py-2 px-4 text-[#18294E]">Dateline</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedSurveyRequests as surveyRequest, i}
					<tr class="border-t text-left {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4">{surveyRequest.asset_nama}</td>
						<td class="py-2 px-4">{surveyRequest.asset_alamat}</td>
						<td class="py-2 px-4 flex items-center">
							<img src="/default_profile_icon.png" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<p class="text-[#18294E]">
								{surveyRequest.nama_lengkap}
							</p>
						</td>

						{#if surveyRequest.status_request === 'O'}
							<td class="py-2 px-4">Ongoing</td>
							<td class="py-2 px-4">{formatDate(surveyRequest.dateline)}</td>
						{:else if surveyRequest.status_request === 'F'}
							<td class="py-2 px-4">Finished</td>
							<td class="py-2 px-4">-</td>
						{/if}
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
