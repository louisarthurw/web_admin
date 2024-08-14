<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { companies } from '$lib/company';
	import { goto } from '$app/navigation';

	let companyId = $page.params.id;
	let transactionIndex = $page.params.transactionIndex;
	let company = companies.find((c) => c.id == companyId);
	let transaction = company.transactionDetail[transactionIndex];

	let date = '';
	let time = '';
	let place = '';
	let notes = '';
	let file = '';
	let fileType = '';

	function handleCancel() {
		goto(`/user/manage/company/transactions/${companyId}`);
	}

	function handleAddMeeting() {
		const newMeeting = {
			meeting: `Meeting ${transaction.detail.length + 1}`,
			date,
			time,
			place,
			notes,
			file,
			fileType
		};

		transaction.detail.push(newMeeting);
		company.totalTransaction += 1;
		goto(`/user/manage/company/transactions/${companyId}`);
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Add Meeting</h1>
	<form class="space-y-4" on:submit|preventDefault={handleAddMeeting}>
		<input
			bind:value={date}
			type="text"
			placeholder="Date"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={time}
			type="text"
			placeholder="Time"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={place}
			type="text"
			placeholder="Place"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={notes}
			type="text"
			placeholder="Notes"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			required
		/>
		<input
			bind:value={file}
			type="text"
			placeholder="File (if any)"
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
		/>
		<select
			bind:value={fileType}
			class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {fileType ===
			''
				? 'text-gray-500'
				: 'text-black'}"
		>
			<option value="" disabled selected>File Type (if any)</option>
			<option value="LOI">LOI</option>
			<option value="Contract">Contract</option>
			<option value="Addendum">Addendum</option>
		</select>

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				on:click={() => handleCancel($page.params.id)}
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>CANCEL</button
			>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>ADD</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
