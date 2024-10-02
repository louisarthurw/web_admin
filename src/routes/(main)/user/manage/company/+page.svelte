<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;
	const companies = data.companies;

	let searchQuery = '';
	let filteredCompanies = companies;

	let currentPage = 1;
	let itemsPerPage = 9;
	let totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredCompanies = companies;
		} else {
			filteredCompanies = companies.filter((company) =>
				`${company.username} ${company.perusahaan_id} ${company.usercount} ${company.transactioncount}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
		}
		currentPage = 1;
		totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
	}

	$: paginatedCompanies= filteredCompanies.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: startEntry = (currentPage - 1) * itemsPerPage + 1;
	$: endEntry = Math.min(currentPage * itemsPerPage, filteredCompanies.length);

	function goToPage(pageNumber) {
		currentPage = pageNumber;
	}

	function handleEdit(id) {
		goto(`/user/manage/company/edit/${id}`);
	}

	function handleNameClick() {
		goto(`/user/manage`);
	}

	function handleTotalTransactionClick(transactionId) {
		goto(`/user/manage/company/transactions/${transactionId}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="container mx-auto py-4 w-full">
	<div class="flex w-[90vw] mx-auto mb-4">
		<input
			type="text"
			placeholder="Search Company"
			bind:value={searchQuery}
			on:input={handleSearch}
			class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
		/>
	</div>

	<div class="flex justify-center">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr>
					<th class="py-2 text-[#18294E] text-start pl-4">
						<button
							class="font-normal cursor-pointer focus:outline-none"
							on:click={handleNameClick}
						>
							Name
						</button>
						/
						<span class="font-bold">Company</span>
					</th>
					<th class="py-2 text-[#18294E]">Company ID</th>
					<th class="py-2 text-[#18294E]">User</th>
					<th class="py-2 text-[#18294E]">Total Transaction</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedCompanies as company, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4 flex">
							<img src="/default_profile_icon.png" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<button
								on:click={() => handleEdit(company.perusahaan_id)}
								class="cursor-pointer focus:outline-none font-semibold text-[#18294E]"
							>
								{company.nama}
							</button>
						</td>
						<td class="py-2 px-4">{company.perusahaan_id}</td>
						<td class="py-2 px-4">{company.usercount}</td>
						<td class="py-2 px-4"
							><button
								on:click={() => handleTotalTransactionClick(company.perusahaan_id)}
								class="cursor-pointer focus:outline-none font-semibold"
								>{company.transactioncount}</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-between mt-2 w-[90vw] mx-auto">
		<span class="text-[#18294E] font-medium">
			Showing {startEntry} to {endEntry} of {filteredCompanies.length} entries
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
