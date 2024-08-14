<script>
	// @ts-nocheck

	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { verifications } from '$lib/verification';

	let companyName = '';
	let name = '';
	let username = '';
	let date = '';
	let time = '';
	let companyUsername = '';
	let location = '';
	let type = '';
	let ownershipDocument = '';
	let companyDocument = '';
	let initialCapital = '';
	let description = '';

	let verificationId = $page.params.id;
	let verification = verifications.find((v) => v.id == verificationId);

	if (verification) {
		companyName = verification.companyName;
		name = verification.name;
		username = verification.username;
		date = verification.date;
		time = verification.time;
		companyUsername = verification.companyUsername;
		location = verification.location;
		type = verification.type;
		ownershipDocument = verification.ownershipDocument;
		companyDocument = verification.companyDocument;
		initialCapital = verification.initialCapital;
		description = verification.description;
	}

	const back = () => {
		goto('/user/transaction');
	};

	let showDeclinePopup = false;
	let declineReason = '';
	let showAcceptPopup = false;
	let selectedClass = '';

	const openDeclinePopup = () => {
		showDeclinePopup = true;
	};

	const closeDeclinePopup = () => {
		showDeclinePopup = false;
		declineReason = '';
	};

	const sendDeclineReason = () => {
		if (declineReason.trim() === '') {
			alert('decline reason harus diisi!');
		} else {
			// alert(`Decline reason: ${declineReason}`);
			closeDeclinePopup();
			goto('/user/verif');
		}
	};

	const openAcceptPopup = () => {
		showAcceptPopup = true;
	};

	const closeAcceptPopup = () => {
		showAcceptPopup = false;
		selectedClass = '';
	};

	const showSelectedClass = () => {
		if (selectedClass === '') {
			alert('pilih class terlebih dahulu!')
		} else {
			// alert(`Selected class: ${selectedClass}`);
			closeAcceptPopup();
			goto('/user/verif');
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		openAcceptPopup();
	};
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{companyName}</h1>
	<form class="space-y-2" on:submit={handleSubmit}>
		<div>
			<label class="text-[#18294E] font-semibold" for="name">Request By</label>
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
				bind:value={date}
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
			<label class="text-[#18294E] font-semibold" for="companyUsername">Company Username</label>
			<input
				id="companyUsername"
				bind:value={companyUsername}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				bind:value={location}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				bind:value={type}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="ownershipDocument">Ownership Document</label>
			<input
				id="ownershipDocument"
				bind:value={ownershipDocument}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyDocument">Company Document</label>
			<input
				id="companyDocument"
				bind:value={companyDocument}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="initialCapital">Initial Capital</label>
			<input
				id="initialCapital"
				bind:value={initialCapital}
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
				ACCEPT
			</button>
			<div class="w-1/3"></div>
		</div>
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

{#if showAcceptPopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<h2 class="text-lg font-semibold mb-4">Please choose class</h2>

			<select
				bind:value={selectedClass}
				class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedClass ===
				''
					? 'text-gray-500'
					: 'text-black'}"
			>
				<option value="" disabled selected>Choose class</option>
				<option value="micro">Micro</option>
				<option value="small">Kecil</option>
				<option value="medium">Sedang</option>
				<option value="large">Besar</option>
			</select>

			<div class="flex justify-center mt-4">
				<button
					on:click={closeAcceptPopup}
					class="w-1/4 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					CANCEL
				</button>
				<button
					on:click={showSelectedClass}
					class="w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					SEND
				</button>
			</div>
		</div>
	</div>
{/if}
