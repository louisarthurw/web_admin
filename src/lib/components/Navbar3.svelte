<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	export let currentPage = '';
</script>

<div class="px-2 sm:px-4 w-full border-b border-gray-300 bg-[#18294E] pt-4 flex justify-between">
	<div class="flex">
		<a
			href="/aset/verif"
			class={`self-center whitespace-nowrap text-lg text-white mr-16 ${currentPage === '/aset/verif' ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
		>
			Verification
		</a>
		<a
			href="/aset/manage"
			class={`self-center whitespace-nowrap text-lg text-white ${currentPage === '/aset/manage' ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
		>
			Management
		</a>
	</div>
</div>
