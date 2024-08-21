<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	export let currentPage = '';
</script>

<div class="bg-[#18294E] px-2 sm:px-4 w-full border-b border-gray-300 flex justify-between pt-4">
	<div class="container mx-auto">
		<div class="flex justify-start items-center space-x-16">
			<a
				href="/user/transaction"
				class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/transaction') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
			>
				Transaction
			</a>
			<a
				href="/user/verif"
				class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/verif') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
			>
				Verification
			</a>
			<a
				href="/user/manage"
				class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/manage') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
			>
				Management
			</a>
		</div>
	</div>
</div>
