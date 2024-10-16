<script>
	// @ts-nocheck

	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { server, auth } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const transactionRequestDetail = data.transactionRequestDetail;
	console.log(transactionRequestDetail)

	let showMessagePopup = false;
	let message = '';
	let actionType = '';

	const serverDetails = get(server);

	const back = () => {
		goto('/user/transaction');
	};

	const openMessagePopup = (type) => {
		showMessagePopup = true;
		actionType = type;
	};

	const closeMessagePopup = () => {
		showMessagePopup = false;
		message = '';
		actionType = '';
	};

	function formatDate(dateString) {
		const date = new Date(dateString);
		const formattedDate = date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
		return `${formattedDate}`;
	}

	function formatTime(timeString) {
		const [hour, minute, second] = timeString.split(':');
		return `${hour}:${minute}`;
	}

	function getFileName(path) {
		return path.split('/').pop();
	}

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{transactionRequestDetail.nama_aset}</h1>
	<form class="space-y-2">
		<div>
			<label class="text-[#18294E] font-semibold" for="progress">Progress</label>
			<input
				id="progress"
				value={transactionRequestDetail.nama_progress}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="name">Request For</label>
			<input
				id="name"
				value={transactionRequestDetail.nama_lengkap}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				id="username"
				value={transactionRequestDetail.username}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="date">Date</label>
			<input
				id="date"
				value={formatDate(transactionRequestDetail.tgl_meeting)}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="time">Time</label>
			<input
				id="time"
				value={formatTime(transactionRequestDetail.waktu_meeting)}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="place">Place</label>
			<input
				id="place"
				value={transactionRequestDetail.lokasi_meeting}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="proposal">Proposal</label>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={transactionRequestDetail.proposal}"
				target="_blank"
			>
				<input
					id="proposal"
					value={getFileName(transactionRequestDetail.proposal)}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					readonly
				/>
			</a>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="description">Description</label>
			<textarea
				id="description"
				bind:value={transactionRequestDetail.deskripsi}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="5"
				disabled
			/>
		</div>

		{#if transactionRequestDetail.status != 'W'}
			<div>
				{#if transactionRequestDetail.status === 'D'}
					<label class="text-[#18294E] font-semibold" for="message">Decline Reason</label>
				{:else if transactionRequestDetail.status === 'A'}
					<label class="text-[#18294E] font-semibold" for="acceptMessage">Message</label>
				{/if}
				<input
					id="message"
					value={transactionRequestDetail.alasan}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
		{/if}

		{#if transactionRequestDetail.status === 'W' && privilege_id.includes(16)}
			<div class="flex justify-between pt-8">
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={() => openMessagePopup('decline')}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					DECLINE
				</button>
				<button
					type="button"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					on:click={() => openMessagePopup('accept')}
				>
					ACCEPT
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

{#if showMessagePopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<form
				action={actionType === 'decline' ? '?/declineTransReq' : '?/acceptTransReq'}
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });

						if (result.status === 200) {
							Swal.fire({
								icon: 'success',
								title:
									actionType === 'decline'
										? 'Berhasil Decline Transaction Request!'
										: 'Berhasil Accept Transaction Request!',
								text: result.data.message
							}).then(() => {
								goto('/user/transaction');
							});
						} else {
							Swal.fire({
								icon: 'error',
								title:
									actionType === 'decline'
										? 'Gagal Decline Transaction Request!'
										: 'Gagal Accept Transaction Request!',
								text: result.data.message
							});
						}
					};
				}}
			>
				<h2 class="text-lg font-semibold mb-4">
					{#if actionType === 'decline'}
						Please input reason to decline!
					{:else if actionType === 'accept'}
						Please input message for {transactionRequestDetail.nama_lengkap}!
					{/if}
				</h2>
				<textarea
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					rows="4"
					name="alasan"
					bind:value={message}
					required
				></textarea>
				<div class="flex justify-center mt-4">
					<button
						on:click={closeMessagePopup}
						class="w-1/4 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
					>
						CANCEL
					</button>

					<button
						type="submit"
						class="ml-4 w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] border-2 border-[#18294E] rounded-md hover:bg-[#152140] transition duration-200"
					>
						SEND
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
