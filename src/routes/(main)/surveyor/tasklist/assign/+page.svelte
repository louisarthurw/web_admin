<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const assets = data.assets;
	const surveyors = data.surveyors;

	let selectedAsset = null;
	let selectedSurveyor = null;

	let dateline = '';

	const handleBack = () => {
		goto(`/surveyor/tasklist`);
	};

	function handleSelectAsset(event) {
		const selectedAssetId = event.target.value;
		console.log('asset id: ', selectedAssetId);
		selectedAsset = assets.find((asset) => asset.id_asset === parseInt(selectedAssetId));
	}

	function handleSelectSurveyor(event) {
		const selectedSurveyorId = event.target.value;
		console.log('surveyor id: ', selectedSurveyorId);
		selectedSurveyor = surveyors.find(
			(surveyor) => surveyor.user_id === parseInt(selectedSurveyorId)
		);
	}

	function getAssetType(type) {
		switch (type) {
			case 'B':
				return 'Building';
			case 'L':
				return 'Land';
			case 'A':
				return 'Apart';
			default:
				return 'Unknown';
		}
	}
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Assign Surveyor</h1>
	<form
		class="flex flex-col flex-grow space-y-2"
		action="?/assignSurveyor"
		enctype="multipart/form-data"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil assign surveyor!',
						text: result.data.message
					}).then(() => {
						goto('/surveyor/tasklist');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal assign surveyor!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			{#if selectedAsset}
				<label class="text-[#18294E] font-semibold" for="selectedAsset">Selected Asset</label>
			{/if}
			<select
				id="selectedAsset"
				name="id_asset"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedAsset
					? 'text-[#18294E] font-semibold'
					: 'text-gray-500'}"
				on:change={handleSelectAsset}
				required
			>
				<option value="" disabled selected>Choose Asset</option>
				{#each assets as asset}
					<option value={asset.id_asset} class="text-[#18294E] font-semibold">{asset.nama}</option>
				{/each}
			</select>
		</div>

		{#if selectedAsset}
			<div>
				<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
				<input
					id="assetId"
					type="text"
					value={selectedAsset.id_asset}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="location">Location</label>
				<input
					id="location"
					type="text"
					value={selectedAsset.alamat}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="type">Type</label>
				<input
					id="type"
					type="text"
					value={getAssetType(selectedAsset.tipe)}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="totalArea">Total Area</label>
				<input
					id="totalArea"
					type="text"
					value="{selectedAsset.luas} m²"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="coordinate">Coordinate</label>
				<input
					id="coordinate"
					type="text"
					value={selectedAsset.titik_koordinat}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					disabled
				/>
			</div>
			<div>
				<label class="text-[#18294E] font-semibold" for="coordinateBoundaries"
					>Coordinate Boundaries</label
				>
				<textarea
					id="coordinateBoundaries"
					value={selectedAsset.batas_koordinat}
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					rows="4"
					disabled
				/>
			</div>
		{/if}

		<div>
			{#if selectedSurveyor}
				<label class="text-[#18294E] font-semibold" for="selectedSurveyor">Selected Surveyor</label>
			{/if}
			<select
				id="selectedSurveyor"
				name="user_id"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedSurveyor
					? 'text-[#18294E] font-semibold'
					: 'text-gray-500'}"
				on:change={handleSelectSurveyor}
				required
			>
				<option value="" disabled selected>Choose Surveyor</option>
				{#each surveyors as surveyor}
					<option value={surveyor.user_id} class="text-[#18294E] font-semibold"
						>{surveyor.nama_lengkap}</option
					>
				{/each}
			</select>
		</div>

		<div>
			<label class="text-[#18294E] font-semibold" for="dateline">Dateline</label>
			<input
				id="dateline"
				name="dateline"
				type="date"
				bind:value={dateline}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {dateline ===
				''
					? 'text-gray-500'
					: 'text-[#18294E] font-semibold'}"
				required
			/>
		</div>

		<div>
			<label class="text-[#18294E] font-semibold" for="letterOfAssignment"
				>Letter of Assignment</label
			>
			<input
				id="letterOfAssignment"
				name="letterOfAssignment"
				type="file"
				class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>

		{#if !selectedAsset}
			<div class="flex-grow"></div>
		{/if}

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={handleBack}>CANCEL</button
			>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>ASSIGN</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
