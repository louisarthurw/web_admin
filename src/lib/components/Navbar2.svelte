<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	export let currentPage = '';
</script>

<div class="px-2 sm:px-4 w-full border-b border-gray-300 bg-[#18294E] pt-4 flex justify-between" id="navbar2">
	<div class="flex">
		<a
			href="/surveyor/assign"
			class={`self-center whitespace-nowrap text-lg text-white mr-16 ${currentPage === '/surveyor/assign' ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
		>
			Assignment
		</a>
		<a
			href="/surveyor/manage"
			class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/surveyor/manage') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
		>
			Management
		</a>
	</div>
</div>
