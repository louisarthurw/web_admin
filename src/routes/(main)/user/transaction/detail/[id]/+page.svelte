<script>
// @ts-nocheck

	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { transactions } from '$lib/transaction';

	let assetName = '';
	let name = '';
	let transactionDate = '';
	let username = '';
	let time = '';
	let proposal = '';
	let description = '';

	let transactionId = $page.params.id;
	let transaction = transactions.find((t) => t.id == transactionId);

	if (transaction) {
		assetName = transaction.assetName;
		name = transaction.name;
		transactionDate = transaction.transactionDate;
		username = transaction.username;
		time = transaction.time;
		proposal = transaction.proposal;
		description = transaction.description;
	}

	const handleCancel = () => {
		goto('/user/transaction');
	};

	const back = () => {
		goto('/user/transaction');
	};

	let showDeclinePopup = false;
	let declineReason = '';

	const openDeclinePopup = () => {
		showDeclinePopup = true;
	};

	const closeDeclinePopup = () => {
		showDeclinePopup = false;
		declineReason = '';
	};

	const sendDeclineReason = () => {
		alert(`Decline reason: ${declineReason}`);
		closeDeclinePopup();
		goto('/user/transaction');
	};

	function setMeeting(id) {
		goto(`/user/transaction/setmeeting/${id}`);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		setMeeting(transactionId); 
	};
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{assetName}</h1>
	<form class="space-y-2" on:submit={handleSubmit}>
		<div>
			<label class="text-[#18294E] font-semibold" for="name">Request For</label>
			<input
				id="name"
				bind:value={name}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				id="username"
				bind:value={username}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="date">Date</label>
			<input
				id="date"
				bind:value={transactionDate}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="time">Time</label>
			<input
				id="time"
				bind:value={time}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="proposal">Proposal</label>
			<input
				id="proposal"
				bind:value={proposal}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="description">Description</label>
			<textarea
				id="description"
				bind:value={description}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="5"
				disabled
			/>
		</div>
		{#if transaction.date}
			<div class="flex justify-between pt-8">
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={openDeclinePopup}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					DECLINE
				</button>
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					SET MEETING
				</button>
				<div class="w-1/3"></div>
			</div>
		{:else}
			<div class="flex justify-center pt-8">
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
			</div>
		{/if}
	</form>
</div>

{#if showDeclinePopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<h2 class="text-lg font-semibold mb-4">Please input reason to decline</h2>
			<textarea
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				rows="4"
				bind:value={declineReason}
				required
			></textarea>
			<div class="flex justify-center mt-4">
				<button
					on:click={closeDeclinePopup}
					class="w-1/4 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					CANCEL
				</button>
				<button
					on:click={sendDeclineReason}
					class="w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					SEND
				</button>
			</div>
		</div>
	</div>
{/if}
