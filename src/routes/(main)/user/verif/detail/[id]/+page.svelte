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
	const companyVerifReq = data.companyVerifReq;
	const allClasses = data.allClasses;
	const allBusinessFields = data.allBusinessFields;

	let showDeclinePopup = false;
	let showAcceptPopup = false;
	let selectedClass = '';
	let selectedFields = [];

	const serverDetails = get(server);

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
		const date = new Date(timeString);
		const formattedTime = date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		});
		return `${formattedTime}`;
	}

	function rupiah(amount) {
		if (typeof amount === 'string') {
			amount = parseInt(amount, 10);
		}

		return amount.toLocaleString('id-ID');
	}

	const back = () => {
		goto('/user/verif');
	};

	const openDeclinePopup = () => {
		showDeclinePopup = true;
	};

	const closeDeclinePopup = () => {
		showDeclinePopup = false;
		companyVerifReq.alasan = '';
	};

	const openAcceptPopup = () => {
		showAcceptPopup = true;
	};

	const closeAcceptPopup = () => {
		showAcceptPopup = false;
		selectedClass = '';
		selectedFields = [];
	};

	function setKelas(id) {
		const selectedClass = allClasses.find((kelas) => kelas.id === id);

		return selectedClass.nama;
	}

	function setBusinessField(arrayField) {
		return arrayField.map((field) => field.nama).join(', ');
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
	<h1 class="text-3xl font-bold text-[#18294E]">{companyVerifReq.perusahaan_nama}</h1>
	<form class="space-y-2">
		<div>
			<label class="text-[#18294E] font-semibold" for="name">Request By</label>
			<input
				id="name"
				value={companyVerifReq.user_nama}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				id="username"
				value={companyVerifReq.user_username}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="date">Date</label>
			<input
				id="date"
				value={formatDate(companyVerifReq.created_at)}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="time">Time</label>
			<input
				id="time"
				value={formatTime(companyVerifReq.created_at)}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyUsername">Company Username</label>
			<input
				id="companyUsername"
				value={companyVerifReq.perusahaan_username}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				value={companyVerifReq.lokasi}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				value={companyVerifReq.tipe}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="ownershipDocument">Ownership Document</label>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={companyVerifReq.dokumen_kepemilikan}"
				target="_blank"
			>
				<input
					id="ownershipDocument"
					value={getFileName(companyVerifReq.dokumen_kepemilikan)}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					readonly
				/>
			</a>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyDocument">Company Document</label>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={companyVerifReq.dokumen_perusahaan}"
				target="_blank"
			>
				<input
					id="companyDocument"
					value={getFileName(companyVerifReq.dokumen_perusahaan)}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					readonly
				/>
			</a>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="initialCapital">Initial Capital</label>
			<input
				id="initialCapital"
				value={rupiah(companyVerifReq.modal)}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="description">Description</label>
			<textarea
				id="description"
				value={companyVerifReq.deskripsi}
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="5"
				disabled
			/>
		</div>
		{#if companyVerifReq.status === 'D'}
			<div>
				<label class="text-[#18294E] font-semibold" for="declineMessage">Decline Message</label>
				<input
					id="declineMessage"
					value={companyVerifReq.alasan}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
		{/if}
		{#if companyVerifReq.status === 'A'}
			<div>
				<label class="text-[#18294E] font-semibold" for="class">Class</label>
				<input
					id="class"
					value={setKelas(companyVerifReq.kelas)}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="field">Field</label>
				<input
					id="field"
					value={setBusinessField(companyVerifReq.field)}
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
		{/if}
		{#if companyVerifReq.status === 'W' && privilege_id.includes(18)}
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
					type="button"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					on:click={openAcceptPopup}
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

{#if showDeclinePopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
			<form
				action="?/declineCompanyVerifReq"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });

						if (result.status === 200) {
							Swal.fire({
								icon: 'success',
								title: 'Berhasil Decline Verification Request!',
								text: result.data.message
							}).then(() => {
								goto('/user/verif');
							});
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Gagal Decline Verification Request!',
								text: result.data.message
							});
						}
					};
				}}
			>
				<h2 class="text-lg font-semibold mb-4">Please input reason to decline</h2>
				<textarea
					name="alasan"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					rows="4"
					bind:value={companyVerifReq.alasan}
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
						type="submit"
						class="w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>
						SEND
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

{#if showAcceptPopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
			<form
				action="?/acceptCompanyVerifReq"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });

						if (result.status === 200) {
							Swal.fire({
								icon: 'success',
								title: 'Berhasil Accept Verification Request!',
								text: result.data.message
							}).then(() => {
								goto('/user/verif');
							});
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Gagal Accept Verification Request!',
								text: result.data.message
							});
						}
					};
				}}
			>
				<div>
					<h2 class="text-lg font-semibold mb-2">Please choose class</h2>
					<select
						name="kelas"
						bind:value={selectedClass}
						class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedClass ===
						''
							? 'text-gray-500'
							: 'text-black'}"
						required
					>
						<option value="" disabled selected>Choose class</option>
						{#each allClasses as kelas}
							<option value={kelas.id}>
								<span style="display: inline-block; min-width: 150px;">{kelas.nama}</span>
								{#if kelas.id !== 7}
									({kelas.modal_minimal.toLocaleString('id-ID')} - {kelas.modal_maksimal.toLocaleString(
										'id-ID'
									)})
								{/if}
							</option>
						{/each}
					</select>
				</div>

				<div class="mt-4">
					<h2 class="text-lg font-semibold mb-2">Please choose business field</h2>
					<div class="grid grid-cols-4 gap-4">
						{#each allBusinessFields as field}
							<div class="flex items-center">
								<input
									type="checkbox"
									value={field.id}
									class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
									on:change={(e) => {
										if (e.target.checked) {
											selectedFields.push(field.id);
											selectedFields = selectedFields.sort((a, b) => a - b);
										} else {
											selectedFields = selectedFields.filter((f) => f !== field.id);
											selectedFields = selectedFields.sort((a, b) => a - b);
										}
									}}
								/>
								<input type="hidden" name="selectedField" value={selectedFields} />
								<span class="ml-2">{field.nama}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex justify-center mt-8">
					<button
						on:click={closeAcceptPopup}
						class="w-1/4 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
					>
						CANCEL
					</button>
					<button
						type="submit"
						class="w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>
						SEND
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
