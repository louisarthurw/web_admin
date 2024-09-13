<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	export let data;

	const availableProgress = data.availableProgress;
	const serverDetails = get(server);

	let selectedProgress = null;
	let fileType = '';
	let selectedFile = null;

	let userId = $page.params.user_id;

	function handleCancel() {
		goto(`/user/manage/transactions/${userId}`);
	}

	function handleSelectProgress(event) {
		const selectedProgressId = event.target.value;
		selectedProgress = availableProgress.find((a) => a.id === parseInt(selectedProgressId));
		console.log(selectedProgress);
	}

	function getFileName(path) {
		return path.split('/').pop();
	}

	function handleFileChange(event) {
		selectedFile = event.target.files[0];
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Add Meeting</h1>
	<form
		class="space-y-4"
		action="?/addMeeting"
		method="post"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil Add Meeting!',
						text: result.data.message
					}).then(() => {
						goto(`/user/manage/transactions/${userId}`);
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal Add Meeting!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="selectedProgress">Progress</label>
			<select
				name="id"
				id="selectedProgress"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedProgress
					? 'text-black font-semibold'
					: 'text-gray-500'}"
				on:change={handleSelectProgress}
				required
			>
				<option value="" disabled selected>Choose Progress</option>
				{#each availableProgress as progress}
					<option value={progress.id} class="text-black font-semibold">{progress.nama}</option>
				{/each}
			</select>
		</div>
		{#if selectedProgress}
			<div>
				<label class="text-[#18294E] font-semibold" for="proposal">Proposal</label>
				<a
					href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={selectedProgress.proposal}"
					target="_blank"
				>
					<input
						id="proposal"
						type="text"
						value={getFileName(selectedProgress.proposal)}
						class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E]"
						readonly
					/>
				</a>
			</div>
		{/if}
		<div>
			<label class="text-[#18294E] font-semibold" for="date">Date</label>
			<input
				name="tanggal_meeting"
				type="date"
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="timeStart">Time Start</label>
			<input
				name="waktu_mulai"
				type="time"
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="timeEnd">Time End</label>
			<input
				name="waktu_selesai"
				type="time"
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="place">Place</label>
			<input
				name="tempat_meeting"
				type="text"
				placeholder="Place"
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="proposal">Notes</label>
			<input
				name="notes"
				type="text"
				placeholder="Notes"
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="proposal">File (if any)</label>
			<input
				name="dokumen"
				type="file"
				class="w-full font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				on:change={handleFileChange}
			/>
		</div>
		{#if selectedFile}
			<div>
				<label class="text-[#18294E] font-semibold" for="proposal">File Type (if any)</label>
				<select
					name="tipe_dokumen"
					bind:value={fileType}
					class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {fileType ===
					''
						? 'text-gray-500'
						: 'text-black'}"
					required
				>
					<option value="" disabled selected>Choose File Type</option>
					<option value="L">LOI</option>
					<option value="C">Contract</option>
					<option value="A">Addendum</option>
				</select>
			</div>
		{/if}

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				on:click={handleCancel}
				type="button"
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
