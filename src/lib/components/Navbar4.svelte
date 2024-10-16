<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';
	export let currentPage = '';

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<div class="bg-[#18294E] px-2 sm:px-4 w-full border-b border-gray-300 flex justify-between pt-4">
	<div class="container mx-auto">
		<div class="flex justify-start items-center space-x-16">
			{#if privilege_id.includes(15)}
				<a
					href="/user/transaction"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/transaction') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Transaction
				</a>
			{/if}
			{#if privilege_id.includes(17)}
				<a
					href="/user/verif"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/verif') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Verification
				</a>
			{/if}
			{#if privilege_id.includes(19) || privilege_id.includes(20)}
				<a
					href="/user/manage"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/user/manage') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Management
				</a>
			{/if}
		</div>
	</div>
</div>
