<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const childAsset = data.childAsset;
	console.log(childAsset);

	let id = $page.params.id;

	// let childAssets = asset.child.filter((child) => child.status === 'active');
	let selectedIds;

	if (!childAsset) {
		selectedIds = [];
	} else if (childAsset.length === 1) {
		selectedIds = [''];
	} else if (childAsset.length > 1) {
		selectedIds = ['', ''];
	}

	console.log(selectedIds);
	const handleBack = () => {
		goto(`/aset/manage/overview/${id}`);
	};

	// const generateNewAssetId = () => {
	// 	let maxIdNumber = Math.max(
	// 		...childAssets.map((child) => parseInt(child.assetId.split('.').pop()))
	// 	);
	// 	return `${asset.assetId}.${maxIdNumber + 1}`;
	// };

	// const handleJoin = () => {
	// 	const uniqueIds = new Set(selectedIds);

	// 	if (selectedIds.includes('')) {
	// 		alert('Ada Asset ID yang belum dipilih!');
	// 		return;
	// 	}

	// 	if (uniqueIds.size !== selectedIds.length) {
	// 		alert('Asset ID yang mau di join tidak boleh ada yang sama!');
	// 		return;
	// 	}

	// 	let selectedChilds = childAssets.filter((child) => selectedIds.includes(child.assetId));
	// 	// console.log(selectedChilds)

	// 	let joinedChild = {
	// 		assetId: generateNewAssetId(),
	// 		name: '-',
	// 		type: '-',
	// 		statusAsset: '-',
	// 		legalityLetter: '-',
	// 		legalityNumber: '-',
	// 		legalityFile: '-',
	// 		powerOfAttorney: '-',
	// 		tags: '-',
	// 		usage: '-',
	// 		totalValue: selectedChilds.reduce((sum, child) => sum + child.totalValue, 0),
	// 		totalArea: selectedChilds.reduce((sum, child) => sum + child.totalArea, 0),
	// 		condition: '-',
	// 		coordinateBoundaries: '-',
	// 		idJoin: selectedChilds.map((child) => child.assetId),
	// 		status: 'active'
	// 	};
	// 	// console.log('Aset yang digabung: ', joinedChild);

	// 	childAssets.forEach((child) => {
	// 		if (selectedIds.includes(child.assetId)) {
	// 			child.status = 'inactive';
	// 		}
	// 	});

	// 	asset.child.push(joinedChild);
	// 	console.log('child: ', asset.child);

	// 	goto(`/aset/manage/overview/${id}`);
	// };

	// const handleAddId = () => {
	// 	if (selectedIds.length < childAssets.length) {
	// 		selectedIds = [...selectedIds, ''];
	// 	}
	// 	// console.log('selected id: ', selectedIds);
	// };

	// const handleRemoveId = (index) => {
	// 	if (selectedIds.length > 1) {
	// 		selectedIds = selectedIds.filter((_, i) => i !== index);
	// 	}
	// 	// console.log('selected id: ', selectedIds);
	// };
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-4"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Join Asset ID</h1>

	<form
		class="flex flex-col flex-grow space-y-4"
		action="?/joinChild"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil Join Asset ID!',
						text: result.data.message
					}).then(() => {
						goto('/aset/manage/');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal Join Asset ID!',
						text: result.data.message
					});
				}
			};
		}}
	>
		{#if childAsset}
			{#each selectedIds as selectedId, index}
				<div class="flex items-center space-x-2">
					<select
						class="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] font-semibold {selectedIds[
							index
						] === ''
							? 'text-gray-500'
							: 'text-black'}"
						bind:value={selectedIds[index]}
						required
					>
						<option value="" disabled selected>Choose Asset ID</option>
						{#each childAsset as child}
							<option value={child.id_asset} class="text-black">{child.nama}</option>
						{/each}
					</select>
					<input type="hidden" name="selected_id" value={selectedIds} />

					<!-- <button
						type="button"
						on:click={() => handleRemoveId(index)}
						class="flex justify-center text-white px-4 py-2 rounded-md bg-[#18294E] font-bold"
					>
						-
					</button> -->
				</div>
			{/each}

			<!-- {#if selectedIds.length < childAssets.length}
				<button
					type="button"
					on:click={handleAddId}
					class="text-[#18294E] font-bold text-xl self-start"
				>
					add ID
				</button>
			{/if} -->
		{/if}

		<div
			class="flex-grow {!childAsset
				? 'flex justify-center items-center text-2xl text-[#18294E]'
				: ''}"
		>
			{#if !childAsset}
				<p>Asset tidak mempunyai Asset ID!</p>
			{/if}
		</div>

		<div class="flex justify-between pt-8">
			<div class={selectedIds.length > 1 ? 'w-1/3' : 'w-5/12'}></div>
			<button
				type="button"
				on:click={handleBack}
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
			>
				BACK
			</button>
			{#if selectedIds.length > 1}
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>
					JOIN
				</button>
			{/if}

			<div class={selectedIds.length > 1 ? 'w-1/3' : 'w-5/12'}></div>
		</div>
	</form>
</div>
