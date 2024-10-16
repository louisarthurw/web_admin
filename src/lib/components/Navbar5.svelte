<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';
	export let currentPage = '';

	let assetId = $page.params.id;
</script>

<div class="bg-white px-2 sm:px-4 w-full border-b border-gray-300 shadow-lg flex justify-between pt-2">
	<div class="container mx-auto">
		<div class="flex justify-start items-center space-x-20">
			<a
				href="/aset/manage/overview/{assetId}"
				class={`self-center whitespace-nowrap text-lg text-[#18294E] ${currentPage.startsWith('/aset/manage/overview') ? 'border-b-4 border-[#18294E] font-bold pb-1' : 'pb-2'}`}
			>
				Overview
			</a>
			<a
				href="/aset/manage/access/{assetId}"
				class={`self-center whitespace-nowrap text-lg text-[#18294E] ${currentPage.startsWith('/aset/manage/access') ? 'border-b-4 border-[#18294E] font-bold pb-1' : 'pb-2'}`}
			>
				Access
			</a>
			<a
				href="/aset/manage/history/{assetId}"
				class={`self-center whitespace-nowrap text-lg text-[#18294E] ${currentPage.startsWith('/aset/manage/history') ? 'border-b-4 border-[#18294E] font-bold pb-1' : 'pb-2'}`}
			>
				History
			</a>
		</div>
	</div>
</div>
