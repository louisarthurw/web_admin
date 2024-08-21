<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	export let currentPage = '';
</script>

<div class="bg-[#18294E] px-2 sm:px-4 w-full border-b border-gray-300 flex justify-between pt-4">
	<div class="container mx-auto">
		<div class="flex justify-start items-center space-x-16">
			<a
				href="/surveyor/assign"
				class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/surveyor/assign') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
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
</div>
