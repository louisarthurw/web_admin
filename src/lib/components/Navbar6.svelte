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

<div class="flex flex-col h-full bg-[#18294E] text-white">
	<div class="p-6">
		<div class="py-2">
			<a
				href="/profile"
				class={`block text-lg ${currentPage.startsWith('/profile') ? 'font-bold' : ''}`}
			>
				Profile
			</a>
		</div>
		{#if privilege_id.includes(24) || privilege_id.includes(25) || privilege_id.includes(26)}
			<div class="py-2">
				<a
					href="/settings"
					class={`block text-lg ${currentPage.startsWith('/settings') ? 'font-bold' : ''}`}
				>
					Settings
				</a>
			</div>
		{/if}
	</div>
</div>
