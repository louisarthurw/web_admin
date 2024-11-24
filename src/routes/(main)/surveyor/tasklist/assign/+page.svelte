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

	let selectedAssetIds;
	let selectedSurveyor = null;
	let dateline = '';

	if (!assets) {
		selectedAssetIds = [];
	} else {
		selectedAssetIds = [''];
	}

	const handleBack = () => {
		goto(`/surveyor/tasklist`);
	};

	// function handleSelectAsset(event) {
	// 	const selectedAssetId = event.target.value;
	// 	console.log('asset id: ', selectedAssetId);
	// 	selectedAsset = assets.find((asset) => asset.id_asset === parseInt(selectedAssetId));
	// }

	const handleAddNewSelectInput = () => {
		if (selectedAssetIds.length < assets.length) {
			selectedAssetIds = [...selectedAssetIds, ''];
		}
		console.log('selected  asset ids: ', selectedAssetIds);
	};

	const handleRemoveSelectInput = (index) => {
		if (selectedAssetIds.length > 1) {
			selectedAssetIds = selectedAssetIds.filter((_, i) => i !== index);
		}
		console.log('selected  asset ids: ', selectedAssetIds);
	};

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
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-4"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Assign Surveyor</h1>
	<form
		class="flex flex-col flex-grow space-y-2 mt-0"
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
			<label class="text-[#18294E] font-semibold" for="selectedAsset">Selected Asset</label>
			{#if assets}
				{#each selectedAssetIds as selectedAssetId, index}
					<div class="flex items-center space-x-2">
						<select
							class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedAssetIds[
								index
							] === ''
								? 'text-gray-500'
								: 'text-[#18294E] font-semibold'} {index > 0 ? 'mt-2' : ''}"
							bind:value={selectedAssetIds[index]}
							required
						>
							<option value="" disabled selected>Choose Asset</option>
							{#each assets as asset}
								<option value={asset.id_asset} class="text-[#18294E] font-semibold"
									>{asset.nama}</option
								>
							{/each}
						</select>

						<input type="hidden" name="selected_asset_id" value={selectedAssetIds} />

						<button
							type="button"
							on:click={() => handleRemoveSelectInput(index)}
							class="flex justify-center text-white px-6 py-3 rounded-md bg-[#18294E] font-bold {index >
							0
								? 'mt-2'
								: ''}"
						>
							DELETE
						</button>
					</div>
				{/each}

				{#if selectedAssetIds.length < assets.length}
					<div class="flex">
						<button
							type="button"
							on:click={handleAddNewSelectInput}
							class="text-[#18294E] font-bold text-md px-1"
						>
							ADD ASSET
						</button>
					</div>
				{/if}
			{/if}
		</div>

		<div class="mt-2">
			<label class="text-[#18294E] font-semibold" for="selectedSurveyor">Selected Surveyor</label>
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

		<div class="flex-grow"></div>

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
