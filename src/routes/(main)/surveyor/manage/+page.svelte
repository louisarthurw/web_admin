<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { surveyors } from '$lib/surveyors.js';
	import { goto } from '$app/navigation';

	let searchQuery = '';
	let filteredSurveyors = surveyors;

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredSurveyors = surveyors;
		} else {
			filteredSurveyors = surveyors.filter((surveyor) =>
				`${surveyor.name}`.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
	}

	function handleEdit(id) {
		goto(`/surveyor/manage/edit/${id}`);
	}
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="container mx-auto mt-4">
	<div class="flex items-center mb-4 justify-center w-full">
		<div class="flex items-center w-[90vw]">
			<input
				type="text"
				placeholder="Search Surveyor"
				bind:value={searchQuery}
				on:input={handleSearch}
				class="flex-grow border border-gray-300 rounded-lg p-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			<button
				class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
				on:click={() => goto('/surveyor/manage/add')}>Add Surveyor</button
			>
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
				{#each filteredSurveyors as surveyor, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4 flex">
							<img src="/default_profile_icon.png" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<button 
								on:click={() => handleEdit(surveyor.id)} 
								class="cursor-pointer focus:outline-none"
							>
								{surveyor.name}
							</button>
						</td>
						<td class="py-2 px-4">{surveyor.workerId}</td>
						<td class="py-2 px-4">{surveyor.surveyOnProgress}</td>
						<td class="py-2 px-4">{surveyor.totalSurvey}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
