<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const surveyData = data.surveyData;

	function back() {
		goto(`/aset/verif`);
	}

	function reassign() {
		goto(`/surveyor/assign`);
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{surveyData.nama_aset}</h1>
	<form
		class="space-y-2"
		action="?/verificate"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil Verifikasi Survey Request!',
						text: result.data.message
					}).then(() => {
						goto('/aset/verif');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal Verifikasi Survey Request!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
			<input
				id="assetId"
				value={surveyData.id_asset}
				type="text"
				placeholder="Asset ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				value={surveyData.lokasi_asset}
				type="text"
				placeholder="Location"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinate">Coordinate</label>
			<input
				id="coordinate"
				value={surveyData.titik_koordinat_new}
				type="text"
				placeholder="Coordinate"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				value={surveyData.tipe_asset}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalArea">Total Area</label>
			<input
				id="totalArea"
				value="{surveyData.luas_new} m²"
				type="text"
				placeholder="Total Area"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalValue">Total Value</label>
			<input
				id="totalValue"
				value="Rp. {surveyData.nilai_new.toLocaleString('id-ID')}"
				type="text"
				placeholder="Total Value"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="condition">Condition</label>
			<textarea
				id="condition"
				value={surveyData.kondisi_new}
				type="text"
				placeholder="Condition"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="3"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinateBoundaries"
				>Coordinate Boundaries</label
			>
			<textarea
				id="coordinateBoundaries"
				value={surveyData.batas_koordinat_new}
				type="text"
				placeholder="Coordinate Boundaries"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				disabled
			/>
		</div>
		<div class="flex justify-between pt-8">
			{#if surveyData.status_verifikasi === 'N'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				<button
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					VERIFICATE
				</button>
				<div class="w-1/3"></div>
			{:else if surveyData.status_verifikasi === 'V'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					BACK
				</button>
				<div class="w-1/3"></div>
			{:else if surveyData.status_verifikasi === 'R'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				<button
					type="button"
					on:click={reassign}
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					RE-ASSIGN
				</button>
				<div class="w-1/3"></div>
			{/if}
		</div>
	</form>
</div>
