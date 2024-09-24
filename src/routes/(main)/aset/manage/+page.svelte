<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	let assets = data.assets;
	console.log(assets);

	const allProvinces = data.allProvinces;
	const tagsUsed = data.tagsUsed;
	const provinsiUsed = data.provinsiUsed;

	const serverDetails = get(server);

	let searchQuery = '';
	let filteredAssets = assets;
	let filteredChildAssets = [];

	let showFilterPopup = false;
	let selectedType = [];
	let selectedTypeString;
	let selectedStatus = [];
	let selectedStatusString;
	let selectedTag = [];
	let selectedProvince = [];

	let types = [
		{ id: 1, name: 'Land', value: 'L' },
		{ id: 2, name: 'Building', value: 'B' },
		{ id: 3, name: 'Apartment', value: 'A' }
	];

	let statuses = [
		{ id: 1, name: 'For Rent', value: 'S' },
		{ id: 2, name: 'Rented', value: 'T' }
	];

	// assets.forEach((asset) => {
	// 	if (asset.child && asset.child.length > 0) {
	// 		asset.child.forEach((child) => {
	// 			filteredChildAssets.push({
	// 				...child,
	// 				parentId: asset.id,
	// 				parentName: asset.name,
	// 				parentImage: asset.image,
	// 				parentProvince: asset.province
	// 			});
	// 		});
	// 	}
	// });

	// function handleSearch() {
	// 	if (searchQuery.trim() === '') {
	// 		filteredAssets = assets;
	// 		filteredChildAssets = assets.reduce((acc, asset) => {
	// 			if (asset.child && asset.child.length > 0) {
	// 				asset.child.forEach((child) => {
	// 					acc.push({
	// 						...child,
	// 						parentId: asset.id,
	// 						parentName: asset.name,
	// 						parentImage: asset.image,
	// 						parentProvince: asset.province
	// 					});
	// 				});
	// 			}
	// 			return acc;
	// 		}, []);
	// 	} else {
	// 		filteredAssets = assets.filter((asset) =>
	// 			asset.name.toLowerCase().includes(searchQuery.toLowerCase())
	// 		);
	// 		filteredChildAssets = filteredChildAssets.filter((childAsset) =>
	// 			childAsset.name.toLowerCase().includes(searchQuery.toLowerCase())
	// 		);
	// 	}
	// }

	function applyFilter() {
		// filteredAssets = assets.filter((asset) => {
		// 	const matchesType = selectedType.length === 0 || selectedType.includes(asset.type);
		// 	const matchesStatus =
		// 		selectedStatus.length === 0 ||
		// 		selectedStatus.some((status) => asset.statusAsset.includes(status));
		// 	const matchesTag =
		// 		selectedTag.length === 0 || selectedTag.some((tag) => asset.tags.includes(tag));
		// 	const matchesProvince =
		// 		selectedProvince.length === 0 || selectedProvince.includes(asset.province);

		// 	return matchesType && matchesStatus && matchesTag && matchesProvince;
		// });

		// filteredChildAssets = [];
		// assets.forEach((asset) => {
		// 	if (asset.child && asset.child.length > 0) {
		// 		asset.child.forEach((child) => {
		// 			const matchesType = selectedType.length === 0 || selectedType.includes(child.type);
		// 			const matchesStatus =
		// 				selectedStatus.length === 0 ||
		// 				selectedStatus.some((status) => child.statusAsset.includes(status));
		// 			const matchesTag =
		// 				selectedTag.length === 0 || selectedTag.some((tag) => child.tags.includes(tag));
		// 			const matchesProvince =
		// 				selectedProvince.length === 0 || selectedProvince.includes(asset.province);

		// 			if (matchesType && matchesStatus && matchesTag && matchesProvince) {
		// 				filteredChildAssets.push({
		// 					...child,
		// 					parentId: asset.id,
		// 					parentName: asset.name,
		// 					parentImage: asset.image,
		// 					parentProvince: asset.province
		// 				});
		// 			}
		// 		});
		// 	}
		// });

		closeFilterPopup();
	}

	function resetFilter() {
		// selectedType = [];
		// selectedStatus = [];
		// selectedTag = [];
		// selectedProvince = [];

		// filteredAssets = assets;
		// filteredChildAssets = assets.reduce((acc, asset) => {
		// 	if (asset.child && asset.child.length > 0) {
		// 		asset.child.forEach((child) => {
		// 			acc.push({
		// 				...child,
		// 				parentId: asset.id,
		// 				parentName: asset.name,
		// 				parentImage: asset.image,
		// 				parentProvince: asset.province
		// 			});
		// 		});
		// 	}
		// 	return acc;
		// }, []);
		filteredAssets = assets;
		selectedType = [];
		selectedTypeString = '';
		selectedStatus = [];
		selectedStatusString = '';
		selectedTag = [];
		selectedProvince = [];
		closeFilterPopup();
	}

	function goToDetails(id) {
		goto(`/aset/manage/overview/${id}`);
	}

	const openFilterPopup = () => {
		showFilterPopup = true;
		document.body.classList.add('overflow-hidden');
	};

	const closeFilterPopup = () => {
		showFilterPopup = false;
		document.body.classList.remove('overflow-hidden');
	};

	function setProvinsi(id) {
		const convertedProvince = allProvinces.find((province) => province.id === id);
		return convertedProvince.nama;
	}

	function getParentAsset(id) {
		const asset = assets.find((a) => a.id_asset === id);
		return asset.nama;
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="container mx-auto mt-4">
	<div class="flex flex-col items-center justify-center w-full">
		<div class="flex items-center w-[90vw] mb-4 space-x-4">
			<!-- bind:value={searchQuery}
			on:input={handleSearch} -->
			<input
				type="text"
				placeholder="Search Asset"
				class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18294E]"
			/>
			<button
				class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
				on:click={() => goto('/aset/manage/add')}>Add Asset</button
			>
			<button
				class="flex-none bg-[#18294E] text-white px-4 py-2 rounded-lg"
				on:click={openFilterPopup}>Filter</button
			>
		</div>

		{#if filteredAssets}
			{#each filteredAssets as asset}
				<button
					class="flex w-[90vw] bg-white p-4 border rounded-lg shadow mb-4"
					on:click={() => goToDetails(asset.id_asset)}
				>
					<img
						src={asset.link_gambar
							? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${asset.link_gambar[0]}`
							: '/asset.jpg'}
						alt={asset.name}
						class="w-24 h-24 rounded-lg mr-6 object-cover"
					/>

					<div class="flex flex-col text-left h-24 justify-center">
						<p class="text-[#18294E] font-bold text-2xl">
							{#if asset.id_asset_parent}
								{asset.nama} [Bagian dari {getParentAsset(asset.id_asset_parent)}]
							{:else}
								{asset.nama}
							{/if}
						</p>
						<p class="text-[#18294E] text-lg">{asset.alamat}, {setProvinsi(asset.provinsi)}</p>
						<p class="text-[#18294E] text-lg">
							Status: <span class="font-bold"
								>{asset.status_asset === 'S' ? 'For Rent' : 'Rented'}</span
							>
						</p>
					</div>
				</button>
			{/each}
		{/if}

		<!-- {#each filteredChildAssets as childAsset}
			{#if childAsset.status === 'active'}
				<button
					class="flex w-[90vw] bg-white p-4 border rounded-lg shadow mb-4"
					on:click={() => goToDetails(childAsset.parentId)}
				>
					<img
						src={childAsset.parentImage}
						alt={childAsset.parentName}
						class="w-24 h-24 rounded-lg mr-6 object-cover"
					/>

					<div class="flex flex-col text-left h-24 justify-center">
						<p class="text-[#18294E] font-bold text-2xl">{childAsset.name}</p>
						<p class="text-[#18294E] font-semibold text-lg">[Child dari {childAsset.parentName}]</p>
						<p class="text-[#18294E] text-lg">
							Status: <span class="font-bold">{childAsset.statusAsset}</span>
						</p>
					</div>
				</button>
			{/if}
		{/each} -->
	</div>
</div>

{#if showFilterPopup}
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
		<div class="bg-white p-6 rounded-lg shadow-lg w-23/24 h-5/6 flex flex-col overflow-y-auto">
			<form
				class="flex flex-col flex-grow"
				action="?/filterAsset"
				method="post"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update({ reset: false });
						filteredAssets = [...result.data.data];

						if (result.status === 200) {
							Swal.fire({
								icon: 'success',
								title: 'Berhasil Filter Asset!',
								text: result.data.message
							}).then(() => {
								closeFilterPopup();
							});
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Gagal Filter Asset!',
								text: result.data.message
							});
						}
					};
				}}
			>
				<div>
					<div class="flex justify-between mb-2">
						<h2 class="text-lg font-semibold mb-2">Type</h2>
						<button class="text-lg text-[#18294E] font-bold pr-4" on:click={closeFilterPopup}
							>X</button
						>
					</div>

					<div class="grid grid-cols-6 gap-4">
						{#each types as type}
							<div class="flex items-center">
								<input
									type="checkbox"
									value={type.value}
									checked={selectedType.includes(type.value)}
									class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
									on:change={(e) => {
										if (e.target.checked) {
											selectedType.push(type.value);
										} else {
											selectedType = selectedType.filter((t) => t !== type.value);
										}
										selectedTypeString = selectedType.join(',');
										// console.log('type: ', selectedType);
									}}
								/>
								<input type="hidden" name="type" value={selectedTypeString} />
								<span class="ml-2">{type.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-4">
					<h2 class="text-lg font-semibold mb-2">Status</h2>
					<div class="grid grid-cols-6 gap-4">
						{#each statuses as status}
							<div class="flex items-center">
								<input
									type="checkbox"
									value={status.value}
									checked={selectedStatus.includes(status.value)}
									class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
									on:change={(e) => {
										if (e.target.checked) {
											selectedStatus.push(status.value);
										} else {
											selectedStatus = selectedStatus.filter((s) => s !== status.value);
										}
										selectedStatusString = selectedStatus.join(',');
										// console.log('status: ', selectedStatus);
									}}
								/>
								<input type="hidden" name="status" value={selectedStatusString} />
								<span class="ml-2">{status.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-4">
					<h2 class="text-lg font-semibold mb-2">Tag</h2>
					<div class="grid grid-cols-6 gap-4">
						{#each tagsUsed as tag}
							<div class="flex items-center">
								<input
									type="checkbox"
									value={tag.id}
									checked={selectedTag.includes(tag.id)}
									class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
									on:change={(e) => {
										if (e.target.checked) {
											selectedTag.push(tag.id);
											selectedTag = selectedTag.sort((a, b) => a - b);
										} else {
											selectedTag = selectedTag.filter((t) => t !== tag.id);
											selectedTag = selectedTag.sort((a, b) => a - b);
										}
										// console.log('tag: ', selectedTag);
									}}
								/>
								<span class="ml-2">{tag.nama}</span>
								<input type="hidden" name="tag" value={selectedTag} />
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-4">
					<h2 class="text-lg font-semibold mb-2">Province</h2>
					<div class="grid grid-cols-6 gap-4">
						{#each provinsiUsed as province}
							<div class="flex items-center">
								<input
									type="checkbox"
									value={province.id}
									checked={selectedProvince.includes(province.id)}
									class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
									on:change={(e) => {
										if (e.target.checked) {
											selectedProvince.push(province.id);
											selectedProvince = selectedProvince.sort((a, b) => a - b);
										} else {
											selectedProvince = selectedProvince.filter((p) => p !== province.id);
											selectedProvince = selectedProvince.sort((a, b) => a - b);
										}
										// console.log('province: ', selectedProvince);
									}}
								/>
								<span class="ml-2">{province.nama}</span>
								<input type="hidden" name="province" value={selectedProvince} />
							</div>
						{/each}
					</div>
				</div>

				<div class="flex-grow"></div>

				<div class="flex justify-center mt-8">
					<button
						class="w-1/4 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
						on:click={resetFilter}
					>
						RESET
					</button>
					<button
						class="w-1/4 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
						type="submit"
					>
						APPLY
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
