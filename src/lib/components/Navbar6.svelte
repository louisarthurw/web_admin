<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	export let currentPage = '';
</script>

<div class="flex flex-col h-full bg-[#18294E] text-white">
	<div class="p-6">
		<div class="py-2">
			<a href="/profile" class={`block text-lg ${currentPage.startsWith('/profile') ? 'font-bold' : ''}`}>
				Profile
			</a>
		</div>
		<div class="py-2">
			<a href="/settings" class={`block text-lg ${currentPage.startsWith('/settings') ? 'font-bold' : ''}`}>
				Settings
			</a>
		</div>
	</div>
</div>
