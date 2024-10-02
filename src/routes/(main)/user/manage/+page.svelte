<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const users = data.users;

	const serverDetails = get(server);
	
	let searchQuery = '';
	let filteredUsers = users;

	let currentPage = 1;
	let itemsPerPage = 9;
	let totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredUsers = users;
		} else {
			filteredUsers = users.filter((user) =>
				`${user.nama} ${user.id} ${user.totalPerusahaan} ${user.totalTransaksi}`.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		currentPage = 1;
		totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	}

	$: paginatedUsers= filteredUsers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: startEntry = (currentPage - 1) * itemsPerPage + 1;
	$: endEntry = Math.min(currentPage * itemsPerPage, filteredUsers.length);

	function goToPage(pageNumber) {
		currentPage = pageNumber;
	}

	function handleEdit(id) {
		goto(`/user/manage/edit/${id}`);
	}

	function handleCompanyClick() {
		goto(`/user/manage/company`);
	}

	function handleTotalTransactionClick(transactionId) {
		goto(`/user/manage/transactions/${transactionId}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="container mx-auto py-4 w-full">
	<div class="flex w-[90vw] mx-auto">
		<input
			type="text"
			placeholder="Search User"
			bind:value={searchQuery}
			on:input={handleSearch}
			class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
		/>
	</div>

	<div class="flex justify-center mt-4">
		<table class="min-w-[90vw] bg-white text-center border border-gray-300">
			<thead>
				<tr>
					<th class="py-2 text-[#18294E] text-start pl-4">
						<span class="font-bold">Name</span> /
						<button
							class="font-normal cursor-pointer focus:outline-none"
							on:click={handleCompanyClick}
						>
							Company
						</button>
					</th>
					<th class="py-2 text-[#18294E]">User ID</th>
					<th class="py-2 text-[#18294E]">Company</th>
					<th class="py-2 text-[#18294E]">Total Transaction</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedUsers as user, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4 flex">
							<img src={user.foto_profil
								? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${user.foto_profil}`
								: '/default_profile_icon.png'} alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<button
								on:click={() => handleEdit(user.id)}
								class="cursor-pointer focus:outline-none font-semibold text-[#18294E]"
							>
								{user.nama}
							</button>
						</td>
						<td class="py-2 px-4">{user.id}</td>
						<td class="py-2 px-4">{user.totalPerusahaan}</td>
						<td class="py-2 px-4"
							><button
								on:click={() => handleTotalTransactionClick(user.id)}
								class="cursor-pointer focus:outline-none font-semibold"
								>{user.totalTransaksi}</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-between mt-2 w-[90vw] mx-auto">
		<span class="text-[#18294E] font-medium">
			Showing {startEntry} to {endEntry} of {filteredUsers.length} entries
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
