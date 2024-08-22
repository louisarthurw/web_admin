<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { assets } from '$lib/asset';
	import Navbar5 from '$lib/components/Navbar5.svelte';

	let assetId = $page.params.id;
	let asset = assets.find((a) => a.id == assetId);
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="px-8 sm:px-4 pt-4 pb-4">
	<h2 class="text-[#18294E] text-2xl font-bold mb-2">{asset.name}</h2>
	<div class="flex space-x-4">
		{#each Array(5) as _, i}
			<img
				src={asset.image}
				alt="{asset.name} image {i + 1}"
				class="w-64 h-64 object-cover rounded-md"
			/>
		{/each}
	</div>
</div>

<Navbar5 currentPage={$page.url.pathname}></Navbar5>

<div class="bg-gray-100 {asset.verification === 'skip' ? 'flex items-center justify-center' : ''}" style="min-height: calc(100vh - 362.4px)">
	{#if asset.verification != 'skip'}
		<div class="p-4 space-y-2 text-lg text-[#18294E] font-medium">
			<div class="flex">
				<span class="min-w-[120px]">Asset ID</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.assetId}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Location</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.location}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Type</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.type}</span>
			</div>
			<div class="flex">
				<span class="min-w-[120px]">Total Area</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.totalArea} m²</span>
			</div>

			<div class="flex">
				<span class="min-w-[120px]">Verification</span>
				<span class="ml-2 mr-4">:</span>
				{#if asset.verification === 'ok'}
					<span><p class="font-bold text-[#00FF38]">DONE</p></span>
				{:else}
					<span><p class="font-bold text-red-600">WAITING</p></span>
				{/if}
			</div>
		</div>

		{#if asset.history && asset.history.length > 0}
			<div class="p-4 text-lg text-[#18294E] font-medium">
				<h2 class="text-[#18294E] text-2xl font-bold mb-2">Survey</h2>
				<ul class="list-disc pl-5 space-y-4">
					{#each asset.history as surveyHistory}
						<li class="p-4 bg-white rounded-lg space-y-4">
							<p class="flex text-2xl font-bold">
								{surveyHistory.name}
							</p>
							<ul class="space-y-2">
								<li class="flex">
									<span class="min-w-[110px] font-semibold">Updated on</span>
									<span class="ml-2 mr-4">:</span>
									<span>{surveyHistory.updatedOn}</span>
								</li>
								<li class="flex">
									<span class="min-w-[110px] font-semibold">Value</span>
									<span class="ml-2 mr-4">:</span>
									<div>
										<p>{surveyHistory.value}</p>
										<p>
											Rp {surveyHistory.initialValue.toLocaleString('id-ID')} &#8594 Rp {surveyHistory.currentValue.toLocaleString(
												'id-ID'
											)}
										</p>
									</div>
								</li>
								<li class="flex">
									<span class="min-w-[110px] font-semibold">Condition</span>
									<span class="ml-2 mr-4">:</span>
									<span>{surveyHistory.condition}</span>
								</li>
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{:else}
		<p class="text-lg text-[#18294E] font-semibold">Asset ini belum pernah disurvey!</p>
	{/if}
</div>
