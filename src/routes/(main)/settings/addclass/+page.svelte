<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	const handleCancel = () => {
		goto('/settings');
	};
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class="flex flex-col flex-grow bg-gray-100 p-6 space-y-4">
		<h1 class="text-3xl font-bold text-[#18294E]">Add Class</h1>
		<form
			class="flex flex-grow flex-col space-y-4"
			action="?/addClass"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update({ reset: false });

					if (result.status === 200) {
						Swal.fire({
							icon: 'success',
							title: 'Berhasil Add Class!',
							text: result.data.message
						}).then(() => {
							goto('/settings');
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Gagal Add Class!',
							text: result.data.message
						});
					}
				};
			}}
		>
			<div>
				<h2 class="text-lg font-semibold mb-2">Class</h2>
				<input
					name="nama"
					type="text"
					placeholder="Name"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-2">Range</h2>
				<div class="flex space-x-2 items-center">
					<p class="font-medium">Rp</p>
					<input
						name="minimum"
						type="number"
						placeholder="Minimum Capital"
						class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						min="0"
						required
					/>
					<p class="font-medium">-</p>
					<p class=" font-medium">Rp</p>
					<input
						name="maximum"
						type="number"
						placeholder="Maximum Capital"
						class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						min="0"
						required
					/>
				</div>
			</div>

			<div class="flex-grow"></div>

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
</div>
