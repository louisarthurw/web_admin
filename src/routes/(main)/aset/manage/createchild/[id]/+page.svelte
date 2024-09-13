<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	// import { server } from '$lib/store';
	// import { get } from 'svelte/store';

	let id = $page.params.id;

	export let data;

	const usages = data.usage;
	const tags = data.tags;

	let selectedType = '';
	let selectedUsages = [];
	let selectedTags = [];
	let selectedStatus = '';
	let selectedUserCompany = '';

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
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-gray-100 p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Add Asset ID</h1>
	<form
		class="space-y-4"
		action="?/addChild"
		method="post"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil Add Asset ID!',
						text: result.data.message
					}).then(() => {
						goto(`/aset/manage`);
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal Add Asset ID!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="nama">Name</label>
			<input
				name="nama"
				type="text"
				placeholder="Name"
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
							class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
							on:change={(e) => {
								if (e.target.checked) {
									selectedUsages.push(usage.id);
									selectedUsages = selectedUsages.sort((a, b) => a - b);
								} else {
									selectedUsages = selectedUsages.filter((u) => u !== usage.id);
									selectedUsages = selectedUsages.sort((a, b) => a - b);
								}
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
							class="form-checkbox h-4 w-4 rounded text-[#18294E] focus:ring-0 focus:outline-none"
							on:change={(e) => {
								if (e.target.checked) {
									selectedTags.push(tag.id);
									selectedTags = selectedTags.sort((a, b) => a - b);
								} else {
									selectedTags = selectedTags.filter((t) => t !== tag.id);
									selectedTags = selectedTags.sort((a, b) => a - b);
								}
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
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="file_legalitas">Legality File</label>
			<input
				name="file_legalitas"
				type="file"
				placeholder="Upload Legality File"
				class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="surat_kuasa">Power of Attorney</label>
			<input
				name="surat_kuasa"
				type="file"
				placeholder="Upload Power of Attorney"
				class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="image">Image</label>
			<input
				name="image"
				type="file"
				placeholder="Upload Image"
				class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
				multiple
			/>
		</div>
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
				class="w-full font-semibold p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div>
	
		<div>
			<label class="text-[#18294E] font-semibold" for="kondisi">Condition</label>
			<input
				name="kondisi"
				type="text"
				placeholder="Condition"
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
				>ADD</button
			>
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
