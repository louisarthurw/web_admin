<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	export let data;
	const surveyors = data.surveyors;

	let searchQuery = '';
	let filteredSurveyors = surveyors ? surveyors : [];

	let currentPage = 1;
	let itemsPerPage = 9;
	let totalPages = Math.ceil(filteredSurveyors.length / itemsPerPage);

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredSurveyors = surveyors;
		} else {
			filteredSurveyors = surveyors.filter((surveyor) =>
				`${surveyor.nama_lengkap} ${surveyor.surveyor_id} ${surveyor.surveyonprogress} ${surveyor.totalsurvey}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
		}
		currentPage = 1;
		totalPages = Math.ceil(filteredSurveyors.length / itemsPerPage);
	}

	$: paginatedSurveyors = filteredSurveyors.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: startEntry = (currentPage - 1) * itemsPerPage + 1;
	$: endEntry = Math.min(currentPage * itemsPerPage, filteredSurveyors.length);

	function goToPage(pageNumber) {
		currentPage = pageNumber;
	}

	function handleEdit(id) {
		goto(`/surveyor/manage/edit/${id}`);
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
				placeholder="Search Surveyor"
				bind:value={searchQuery}
				on:input={handleSearch}
				class="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			{#if privilege_id.includes(4)}
				<button
					class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
					on:click={() => goto('/surveyor/manage/add')}>Add Surveyor</button
				>
			{/if}
		</div>
	</div>
	<div class="flex justify-center">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr>
					<th class="py-2 text-[#18294E] text-start pl-4">First Name / Last Name</th>
					<th class="py-2 text-[#18294E]">Worker ID</th>
					<th class="py-2 text-[#18294E]">Survey on Progress</th>
					<th class="py-2 text-[#18294E]">Total Survey</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedSurveyors as surveyor, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4 flex">
							<img src="/default_profile_icon.png" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<button
								on:click={() => handleEdit(surveyor.user_id)}
								class="cursor-pointer focus:outline-none font-semibold text-[#18294E]"
							>
								{surveyor.nama_lengkap}
							</button>
						</td>
						<td class="py-2 px-4">{surveyor.surveyor_id}</td>
						<td class="py-2 px-4">{surveyor.surveyonprogress}</td>
						<td class="py-2 px-4">{surveyor.totalsurvey}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-between mt-2 w-[90vw] mx-auto">
		<span class="text-[#18294E] font-medium">
			Showing {startEntry} to {endEntry} of {filteredSurveyors.length} entries
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
