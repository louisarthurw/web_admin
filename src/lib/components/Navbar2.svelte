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
			{#if privilege_id.includes(2)}
				<a
					href="/surveyor/assign"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/surveyor/assign') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Assignment
				</a>
			{/if}
			{#if privilege_id.includes(3)}
				<a
					href="/surveyor/manage"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/surveyor/manage') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Management
				</a>
			{/if}
			{#if privilege_id.includes(6)}
				<a
					href="/surveyor/tasklist"
					class={`self-center whitespace-nowrap text-lg text-white ${currentPage.startsWith('/surveyor/tasklist') ? 'border-b-4 border-white font-semibold' : 'mb-[4px]'}`}
				>
					Task List
				</a>
			{/if}
		</div>
	</div>
</div>
