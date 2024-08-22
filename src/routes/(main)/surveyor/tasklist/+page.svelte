<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { surveyRequests } from '$lib/surveyrequest.js';
	import { assets } from '$lib/asset.js';
	import { surveyors } from '$lib/surveyors.js';
	import { goto } from '$app/navigation';

	let searchQuery = '';
	let filteredSurveyRequests = [];
	filteredSurveyRequests = surveyRequests.slice().sort((a, b) => {
		if (a.surveyStatus === 'Ongoing' && b.surveyStatus === 'Ongoing') {
			return new Date(a.dateline) - new Date(b.dateline);
		}
		if (a.surveyStatus === 'Done' && b.surveyStatus === 'Done') {
			return new Date(a.dateline) - new Date(b.dateline);
		}
		if (a.surveyStatus === 'Ongoing' && b.surveyStatus === 'Done') return -1;
		if (a.surveyStatus === 'Done' && b.surveyStatus === 'Ongoing') return 1;
		return 0;
	});

	console.log(filteredSurveyRequests);

	function handleSearch() {
		let results = [];

		if (searchQuery.trim() === '') {
			results = surveyRequests.slice();
		} else {
			results = surveyRequests.filter((request) => {
				const asset = assets.find((asset) => asset.id === request.assetId);
				const surveyor = surveyors.find((surveyor) => surveyor.id === request.surveyorId);
				return `${asset.name} ${asset.location} ${surveyor.name} ${request.surveyStatus} ${request.surveyStatus === 'Ongoing' ? formatDate(request.dateline) : ''}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase());
			});
		}

		filteredSurveyRequests = results.sort((a, b) => {
			if (a.surveyStatus === 'Ongoing' && b.surveyStatus === 'Ongoing') {
				return new Date(a.dateline) - new Date(b.dateline);
			}
			if (a.surveyStatus === 'Done' && b.surveyStatus === 'Done') {
				return new Date(a.dateline) - new Date(b.dateline);
			}
			if (a.surveyStatus === 'Ongoing' && b.surveyStatus === 'Done') return -1;
			if (a.surveyStatus === 'Done' && b.surveyStatus === 'Ongoing') return 1;
			return 0;
		});
	}

	function formatDate(dateString) {
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', options);
	}
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="container mx-auto mt-4">
	<div class="flex items-center mb-4 justify-center w-full">
		<div class="flex items-center w-[90vw]">
			<input
				type="text"
				placeholder="Search Task List"
				bind:value={searchQuery}
				on:input={handleSearch}
				class="flex-grow border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			<button
				class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
				on:click={() => goto('/surveyor/tasklist/assign')}
			>
				Assign Surveyor
			</button>
		</div>
	</div>
	<div class="flex justify-center">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr>
					<th class="py-2 px-4 text-[#18294E]">Asset Name</th>
					<th class="py-2 px-4 text-[#18294E]">Address</th>
					<th class="py-2 px-4 text-[#18294E]">Surveyor Name</th>
					<th class="py-2 px-4 text-[#18294E]">Status</th>
					<th class="py-2 px-4 text-[#18294E]">Dateline</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredSurveyRequests as request, i}
					{#if assets && surveyors}
						{#each assets.filter((asset) => asset.id === request.assetId) as asset}
							{#each surveyors.filter((surveyor) => surveyor.id === request.surveyorId) as surveyor}
								<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
									<td class="py-2 px-4">{asset.name}</td>
									<td class="py-2 px-4">{asset.location}</td>
									<td class="py-2 px-4 flex justify-center items-center">
										<img
											src="/default_profile_icon.png"
											alt="avatar"
											class="w-8 h-8 rounded-full mr-2"
										/>
										<p class="text-[#18294E]">
											{surveyor.name}
										</p>
									</td>
									
									<td class="py-2 px-4">{request.surveyStatus}</td>
									{#if request.surveyStatus === 'Ongoing'}
										<td class="py-2 px-4">{formatDate(request.dateline)}</td>
									{:else}
										<td class="py-2 px-4">-</td>
									{/if}
								</tr>
							{/each}
						{/each}
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
