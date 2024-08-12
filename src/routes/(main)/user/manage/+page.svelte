<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { users } from '$lib/user';

	let searchQuery = '';
	let filteredUsers = users;

	function handleSearch() {
		if (searchQuery.trim() === '') {
			filteredUsers = users;
		} else {
			filteredUsers = users.filter((user) =>
				`${user.name}`.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
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

<div class="container mx-auto mt-4 w-full">
	<div class="flex w-[90vw] mx-auto mb-4">
		<input
			type="text"
			placeholder="Search User"
			bind:value={searchQuery}
			on:input={handleSearch}
			class="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
		/>
	</div>

	<div class="flex justify-center">
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
				{#each filteredUsers as user, i}
					<tr class="border-t {i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}">
						<td class="py-2 px-4 flex">
							<img src="/default_profile_icon.png" alt="avatar" class="w-8 h-8 rounded-full mr-2" />
							<button
								on:click={() => handleEdit(user.id)}
								class="cursor-pointer focus:outline-none"
							>
								{user.name}
							</button>
						</td>
						<td class="py-2 px-4">{user.userId}</td>
						<td class="py-2 px-4">{user.totalCompany}</td>
						<td class="py-2 px-4"
							><button
								on:click={() => handleTotalTransactionClick(user.id)}
								class="cursor-pointer focus:outline-none">{user.totalTransaction}</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
