<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const allProgress = data.allProgress;

	const serverDetails = get(server);

	const handleBack = () => {
		goto(`/user/manage/company`);
	};

	function getFileName(path) {
		return path.split('/').pop();
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		return date.toLocaleDateString('id-ID', options);
	}

	function formatTime(timeString) {
		const [hours, minutes] = timeString.split(':');
		return `${hours}:${minutes}`;
	}
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class={`bg-gray-100 p-6 ${allProgress === null ? 'flex flex-col items-center justify-center' : ''}`}
	style="min-height: calc(100vh - 117.6px);"
>
	{#if allProgress === null}
		<div class="flex flex-col items-center justify-center flex-grow">
			<p class="text-gray-500 text-2xl">Belum ada transaksi</p>
		</div>
		<div class="w-full flex justify-center py-4">
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={handleBack}
			>
				BACK
			</button>
		</div>
	{:else}
		<div class="container mx-auto w-[90vw]">
			{#each allProgress as progress, index}
				<h2 class="text-[#18294E] text-2xl font-bold mb-2">{progress.nama_asset}</h2>
				<div class="p-4 rounded-md bg-white mb-4">
					{#each progress.progress as prog, i}
						{#if prog.status === 'A'}
							{#if prog.tgl_meeting !== '' && prog.waktu_mulai !== '' && prog.waktu_selesai !== '' && prog.tempat_meeting !== '' && prog.notes !== ''}
								<div class="mb-4">
									<p class="font-bold text-[#18294E] ml-1 mb-1">{prog.nama}</p>
									<div class="bg-[#18294E] text-white p-4 rounded-md">
										<div class="grid grid-cols-[auto,1fr] gap-x-4 items-start">
											<div>
												<p class="font-bold">Proposal</p>
												<p class="font-bold">Date</p>
												<p class="font-bold">Time Start</p>
												<p class="font-bold">Time End</p>
												<p class="font-bold">Place</p>
												<p class="font-bold">Notes</p>
												<p class="font-bold">File</p>
												<p class="font-bold">File Type</p>
											</div>
											<div>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<a
														href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={prog.proposal}"
														target="_blank"
													>
														<span class="underline">{getFileName(prog.proposal)}</span>
													</a>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{formatDate(prog.tgl_meeting)}</span>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{formatTime(prog.waktu_mulai)}</span>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{formatTime(prog.waktu_selesai)}</span>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{prog.tempat_meeting}</span>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{prog.notes}</span>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<a
														href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={prog.dokumen}"
														target="_blank"
													>
														<span class="underline">{getFileName(prog.dokumen)}</span>
													</a>
												</p>
												<p class="flex">
													<span class="font-bold mr-2">:</span>
													<span>{prog.tipe}</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							{/if}
						{:else}
							<div class="mb-4">
								<p class="font-bold text-[#18294E] ml-1 mb-1">{prog.nama}</p>
								<div class="bg-[#18294E] text-white p-4 rounded-md">
									<p class="text-white font-bold rounded-md">DECLINED</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/each}
			<div class="flex justify-center pt-4">
				<button
					type="button"
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
					on:click={handleBack}
				>
					BACK
				</button>
			</div>
		</div>
	{/if}
</div>
