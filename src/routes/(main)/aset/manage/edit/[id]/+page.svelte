<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const asset = data.asset;
	console.log(asset);
	const usages = data.usage;
	const tags = data.tags;
	const provinces = data.provinces;

	const serverDetails = get(server);

	let id = $page.params.id;

	let isEditingLegalityFile = false;
	let isEditingPowerOfAttorney = false;
	let isAddingNewImage = false;

	let selectedType = asset.tipe;
	let selectedUsages = asset.usage ? asset.usage.map((usage) => usage.id) : [];
	let selectedTags = asset.tags ? asset.tags.map((tag) => tag.id) : [];
	let selectedStatus = asset.status_asset;
	let selectedProvince = asset.provinsi;

	let types = [
		{ id: 1, name: 'Land', value: 'L' },
		{ id: 2, name: 'Building', value: 'B' },
		{ id: 3, name: 'Apartment', value: 'A' }
	];

	let statuses = [
		{ id: 1, name: 'For Rent', value: 'S' },
		{ id: 2, name: 'Rented', value: 'T' }
	];

	const handleCancel = () => {
		goto(`/aset/manage/overview/${id}`);
	};

	function getFileName(path) {
		return path.split('/').pop();
	}

	function toggleEditLegalityFile() {
		isEditingLegalityFile = !isEditingLegalityFile;
	}

	function toggleEditPowerOfAttorney() {
		isEditingPowerOfAttorney = !isEditingPowerOfAttorney;
	}

	function toggleAddNewImage() {
		isAddingNewImage = !isAddingNewImage;
	}

	function deleteImage(gambar) {
		Swal.fire({
			title: 'Delete Image',
			text: 'Are you sure you want to delete the image?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				asset.link_gambar = asset.link_gambar.filter((item) => item !== gambar);
			}
		});
	}
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Edit Data Asset</h1>
	<form
		class="space-y-4"
		action="?/editAsset"
		method="post"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil Edit Asset!',
						text: result.data.message
					}).then(() => {
						goto(`/aset/manage/overview/${id}`);
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal Edit Asset!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="nama">Asset Name</label>
			<input
				name="nama"
				type="text"
				placeholder="Name"
				value={asset.nama}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="tipe">Type</label>
			<select
				name="tipe"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedType ===
				''
					? 'text-gray-500'
					: 'text-black font-semibold'}"
				bind:value={selectedType}
				required
			>
				<option value="" class="text-gray-500" disabled selected>Choose Type</option>
				{#each types as type}
					<option value={type.value} class="text-black font-semibold">{type.name}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="usage">Usage</label>
			<div class="grid grid-cols-6 gap-4 bg-white p-3 border border-gray-300 rounded-md">
				{#each usages as usage}
					<div class="flex items-center">
						<input
							type="checkbox"
							value={usage.id}
							checked={selectedUsages.includes(usage.id)}
							class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
							on:change={(e) => {
								if (e.target.checked) {
									selectedUsages.push(usage.id);
									selectedUsages = selectedUsages.sort((a, b) => a - b);
								} else {
									selectedUsages = selectedUsages.filter((u) => u !== usage.id);
									selectedUsages = selectedUsages.sort((a, b) => a - b);
								}
								console.log(selectedUsages);
							}}
						/>
						<input type="hidden" name="usage" value={selectedUsages} />
						<span class="ml-2">{usage.nama}</span>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="tipe">Tags</label>
			<div class="grid grid-cols-6 gap-4 bg-white p-3 border border-gray-300 rounded-md">
				{#each tags as tag}
					<div class="flex items-center">
						<input
							type="checkbox"
							value={tag.id}
							checked={selectedTags.includes(tag.id)}
							class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
							on:change={(e) => {
								if (e.target.checked) {
									selectedTags.push(tag.id);
									selectedTags = selectedTags.sort((a, b) => a - b);
								} else {
									selectedTags = selectedTags.filter((t) => t !== tag.id);
									selectedTags = selectedTags.sort((a, b) => a - b);
								}
								console.log(selectedTags);
							}}
						/>
						<input type="hidden" name="tag" value={selectedTags} />
						<span class="ml-2">{tag.nama}</span>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="surat_legalitas">Legality Letter</label>
			<input
				name="surat_legalitas"
				type="text"
				placeholder="Legality Letter"
				value={asset.surat_legalitas}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="nomor_legalitas">Legality Number</label>
			<input
				name="nomor_legalitas"
				type="text"
				placeholder="Legality Number"
				value={asset.nomor_legalitas}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="file_legalitas">Legality File</label>
			{#if isEditingLegalityFile}
				<div class="flex space-x-2">
					<input
						name="file_legalitas"
						type="file"
						placeholder="Upload Legality File"
						class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						required
					/>
					<button
						on:click={toggleEditLegalityFile}
						class="flex-none bg-[#18294E] text-white px-6 rounded-lg">Cancel</button
					>
				</div>
			{:else}
				<div class="flex space-x-2">
					<a
						href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={asset.file_legalitas}"
						target="_blank"
						class="w-full"
					>
						<input
							name="file_legalitas"
							type="text"
							placeholder="Upload Legality File"
							value={asset.file_legalitas}
							class="w-full font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							readonly
						/>
					</a>
					<button
						on:click={toggleEditLegalityFile}
						class="flex-none bg-[#18294E] text-white px-6 rounded-lg">Edit</button
					>
				</div>
			{/if}
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="surat_kuasa">Power of Attorney</label>
			{#if isEditingPowerOfAttorney}
				<div class="flex space-x-2">
					<input
						name="surat_kuasa"
						type="file"
						placeholder="Upload Power of Attorney"
						class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						required
					/>
					<button
						on:click={toggleEditPowerOfAttorney}
						class="flex-none bg-[#18294E] text-white px-6 rounded-lg">Cancel</button
					>
				</div>
			{:else}
				<div class="flex space-x-2">
					<a
						href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={asset.surat_kuasa}"
						target="_blank"
						class="w-full"
					>
						<input
							name="surat_kuasa"
							type="text"
							placeholder="Upload Power of Attorney"
							value={asset.surat_kuasa}
							class="w-full font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
							required
						/>
					</a>
					<button
						on:click={toggleEditPowerOfAttorney}
						class="flex-none bg-[#18294E] text-white px-6 rounded-lg">Edit</button
					>
				</div>
			{/if}
		</div>

		<div>
			<label class="text-[#18294E] font-semibold" for="image">Image</label>

			<div class="flex justify-between items-end">
				{#if asset.link_gambar}
					<div class="flex flex-wrap gap-4">
						{#each asset.link_gambar as gambar, i (gambar)}
							<div class="relative w-48 h-48">
								<img
									src={`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`}
									alt="{asset.nama} image {i + 1}"
									class="w-48 h-48 object-cover rounded-md"
								/>

								<button
									type="button"
									class="absolute top-0 right-0 bg-[#18294E] text-white px-1"
									on:click={() => deleteImage(gambar)}
								>
									&times;
								</button>
							</div>
						{/each}
					</div>
				{/if}
				{#if !isAddingNewImage}
					<button
						type="button"
						class="bg-[#18294E] text-white px-6 rounded-lg h-10"
						on:click={toggleAddNewImage}
					>
						Add
					</button>
				{/if}
			</div>
			<input type="hidden" name="gambar_lama" bind:value={asset.link_gambar} />
		</div>

		{#if isAddingNewImage}
			<div class="div">
				<label class="text-[#18294E] font-semibold" for="gambar_baru">New Image</label>
				<div class="flex space-x-2">
					<input
						name="gambar_baru"
						type="file"
						placeholder="Upload Image"
						class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						multiple
						required
					/>
					<button
						class="flex-none bg-[#18294E] text-white px-6 rounded-lg"
						on:click={toggleAddNewImage}>Cancel</button
					>
				</div>
			</div>
		{/if}

		<div>
			<label class="text-[#18294E] font-semibold" for="status">Status</label>
			<select
				name="status"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedStatus ===
				''
					? 'text-gray-500'
					: 'text-black font-semibold'}"
				bind:value={selectedStatus}
				required
			>
				<option value="" class="text-gray-500" disabled selected>Choose Status</option>
				{#each statuses as status}
					<option value={status.value} class="text-black font-semibold">{status.name}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="alamat">Location</label>
			<input
				name="alamat"
				type="text"
				placeholder="Location"
				value={asset.alamat}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="provinsi">Province</label>
			<select
				name="provinsi"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedProvince ===
				''
					? 'text-gray-500'
					: 'text-black font-semibold'}"
				bind:value={selectedProvince}
				required
			>
				<option value="" class="text-gray-500" disabled selected>Choose Province</option>
				{#each provinces as province}
					<option value={province.id} class="text-black font-semibold">{province.nama}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="kondisi">Condition</label>
			<input
				name="kondisi"
				type="text"
				placeholder="Condition"
				value={asset.kondisi}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="titik_koordinat">Coordinate</label>
			<input
				name="titik_koordinat"
				type="text"
				placeholder="Coordinate"
				value={asset.titik_koordinat}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="batas_koordinat">Coordinate Boundaries</label
			>
			<textarea
				name="batas_koordinat"
				type="text"
				placeholder="Coordinate Boundaries"
				value={asset.batas_koordinat}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				rows="4"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="luas">Area</label>
			<input
				name="luas"
				type="number"
				placeholder="Area (m²)"
				value={asset.luas}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				min="0"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="nilai">Nilai</label>
			<input
				name="nilai"
				type="number"
				placeholder="Value (Rupiah)"
				value={asset.nilai}
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				min="0"
				required
			/>
		</div>

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				on:click={handleCancel}
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>CANCEL</button
			>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>SAVE</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
