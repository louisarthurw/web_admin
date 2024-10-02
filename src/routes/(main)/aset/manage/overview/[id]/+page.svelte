<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Navbar5 from '$lib/components/Navbar5.svelte';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';

	export let data;
	let asset;

	let map;
	let mapContainer;
	let coordinate;
	let coordinateBoundaries;
	let initialState;

	$: if (data) {
		asset = data.asset;
		coordinate = asset.titik_koordinat.split(',');
		initialState = { lng: coordinate[1], lat: coordinate[0], zoom: 18 };
	}

	const allAsset = data.allAsset;
	const serverDetails = get(server);

	// let assetId = $page.params.id;
	// let asset = assets.find((a) => a.id == assetId);

	// let activeChildAssets = asset.child.filter(child => child.status === 'active');

	onMount(async () => {
		if (mapContainer) {
			const { Map, MapStyle, Marker, config, Popup } = await import('@maptiler/sdk');
			config.apiKey = 'Y8hoteSrnHNMgKTo6vpx';

			map = new Map({
				container: mapContainer,
				style: MapStyle.STREETS,
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom
			});

			coordinateBoundaries = asset.batas_koordinat.split('\n');
			const polygonCoordinates = [];

			const centerMarker = new Marker({ color: '#FF0000' })
				.setLngLat([initialState.lng, initialState.lat])
				.addTo(map);

			coordinateBoundaries.forEach((coordinate) => {
				const [lat, lng] = coordinate.split(',').map((coord) => parseFloat(coord.trim()));

				if (!isNaN(lat) && !isNaN(lng)) {
					const marker = new Marker({ color: '#18294E' }).setLngLat([lng, lat]).addTo(map);
					polygonCoordinates.push([lng, lat]);
				} else {
					console.warn(`Invalid coordinates for asset ID: ${asset.id_asset}, Name: ${asset.nama}`);
				}
			});

			if (polygonCoordinates.length > 2) {
				map.on('load', () => {
					map.addSource('polygon', {
						type: 'geojson',
						data: {
							type: 'Feature',
							geometry: {
								type: 'Polygon',
								coordinates: [polygonCoordinates]
							}
						}
					});

					map.addLayer({
						id: 'polygonLayer',
						type: 'fill',
						source: 'polygon',
						layout: {},
						paint: {
							'fill-color': '#088',
							'fill-opacity': 0.4
						}
					});
				});
			} else {
				console.warn('Not enough valid boundary coordinates to create a polygon.');
			}
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

	function createChild(id) {
		goto(`/aset/manage/createchild/${id}`);
	}

	function joinChild(id) {
		goto(`/aset/manage/joinchild/${id}`);
	}

	function editChild(childId) {
		goto(`/aset/manage/editchild/${assetId}/${childId}`);
	}

	function setTags(arrayTags) {
		return arrayTags.map((tag) => tag.nama).join(', ');
	}

	function setUsage(arrayUsage) {
		return arrayUsage.map((usage) => usage.nama).join(', ');
	}

	function getAssetType(type) {
		switch (type) {
			case 'B':
				return 'Building';
			case 'L':
				return 'Land';
			case 'A':
				return 'Apart';
			default:
				return 'Unknown';
		}
	}

	function getFileName(path) {
		return path.split('/').pop();
	}

	function getParentAsset(id) {
		const asset = allAsset.find((a) => a.id_asset === id);
		return asset.nama;
	}

	function gotoChild(id) {
		console.log(id);
		goto(`/aset/manage/overview/${id}`);
	}

	// function getJoinedAsset(id_join) {
	// 	const ids = id_join.split(',').map((id) => parseInt(id.trim(), 10));
	// 	console.log('ids: ', ids)

	// 	const filteredAssets = allAsset.filter((asset) => ids.includes(asset.id_asset));
	// 	console.log('filtered assets: ', filteredAssets)

	// 	const assetNames = filteredAssets.map((asset) => asset.nama);

	// 	return assetNames.join(', ');
	// }
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div class="px-8 sm:px-4 py-4">
	<h2 class="text-[#18294E] text-2xl font-bold mb-2">
		{#if asset.id_asset_parent}
			{#if asset.id_join !== '0'}
				{asset.nama} [Bagian dari {getParentAsset(asset.id_asset_parent)}] [Gabungan dari asset ID {asset.id_join}]
			{:else}
				{asset.nama} [Bagian dari {getParentAsset(asset.id_asset_parent)}]
			{/if}
		{:else}
			{asset.nama}
		{/if}
	</h2>
	<div class="flex space-x-4 overflow-x-auto">
		{#if asset.link_gambar}
			{#each asset.link_gambar as gambar, i}
				<img
					src={asset.link_gambar
						? `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`
						: '/asset.jpg'}
					alt="{asset.nama} image {i + 1}"
					class="w-64 h-64 object-cover rounded-md"
				/>
			{/each}
		{/if}
	</div>
</div>

<Navbar5 currentPage={$page.url.pathname}></Navbar5>

<div class="bg-gray-100">
	<div class="p-4 space-y-2 text-lg text-[#18294E] font-medium">
		<div class="flex justify-between">
			<div class="flex">
				<span class="min-w-[190px]">Asset ID</span>
				<span class="ml-2 mr-4">:</span>
				<span>{asset.id_asset}</span>
			</div>
			<div class="flex space-x-2">
				{#if asset.id_join !== '0' && asset.id_asset_child === ''}
					<form
						action="?/unmerge"
						method="post"
						use:enhance={() => {
							return async ({ result, update }) => {
								await update({ reset: false });

								if (result.status === 200) {
									Swal.fire({
										icon: 'success',
										title: 'Berhasil Unmerge Asset!',
										text: result.data.message
									}).then(() => {
										goto('/aset/manage');
									});
								} else {
									Swal.fire({
										icon: 'error',
										title: 'Gagal Unmerge Asset!',
										text: result.data.message
									});
								}
							};
						}}
					>
						<button class="bg-[#18294E] text-white px-4 rounded-lg">Unmerge</button>
					</form>
				{/if}
				<button
					class="bg-[#18294E] text-white px-4 rounded-lg"
					on:click={() => goto(`/aset/manage/edit/${asset.id_asset}`)}>Edit</button
				>
			</div>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Location</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.alamat}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Type</span>
			<span class="ml-2 mr-4">:</span>
			<span>{getAssetType(asset.tipe)}</span>
		</div>

		<div class="flex">
			<span class="min-w-[190px]">Usage</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.usage ? setUsage(asset.usage) : ''}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Tags</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.tags ? setTags(asset.tags) : ''}</span>
		</div>

		<div class="flex">
			<span class="min-w-[190px]">Legality Letter</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.surat_legalitas}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Legality Number</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.nomor_legalitas}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Legality File</span>
			<span class="ml-2 mr-4">:</span>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={asset.file_legalitas}"
				target="_blank"
			>
				<span class="underline">{getFileName(asset.file_legalitas)}</span>
			</a>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Power of Attorney</span>
			<span class="ml-2 mr-4">:</span>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={asset.surat_kuasa}"
				target="_blank"
			>
				<span class="underline">{getFileName(asset.surat_kuasa)}</span>
			</a>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Total Area</span>
			<span class="ml-2 mr-4">:</span>
			<span>{asset.luas} m²</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Value</span>
			<span class="ml-2 mr-4">:</span>
			<span>Rp {asset.nilai.toLocaleString('id-ID')}</span>
		</div>
		<div class="flex">
			<span class="min-w-[190px]">Coordinate Boundaries</span>
			<span class="ml-2 mr-4">:</span>
			<div>
				{#each asset.batas_koordinat.split('\n') as boundary}
					<div>{boundary}</div>
				{/each}
			</div>
			<!-- <span>{asset.batas_koordinat}</span> -->
		</div>
		<div class="map-wrap">
			<div class="map" bind:this={mapContainer}></div>
		</div>
	</div>

	<div class="p-4 text-lg text-[#18294E] font-medium">
		{#if asset.ChildAssets}
			<h2 class="text-[#18294E] text-2xl font-bold mb-2">Child</h2>
			<ul class="list-disc pl-5 space-y-4 mb-4">
				{#each asset.ChildAssets as childAsset}
					<li
						class="p-4 bg-white rounded-lg cursor-pointer"
						on:click={() => gotoChild(childAsset.id_asset)}
					>
						<ul class="space-y-2">
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Asset ID</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.id_asset}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Name</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.nama}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Type</span>
								<span class="ml-2 mr-4">:</span>
								<span>{getAssetType(childAsset.tipe)}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Status</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.status_asset}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality Letter</span>
								<span class="ml-2 mr-4">:</span>

								<span>{childAsset.surat_legalitas}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality Number</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.nomor_legalitas}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Legality File</span>
								<span class="ml-2 mr-4">:</span>
								<span>
									<a
										href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={childAsset.file_legalitas}"
										target="_blank"
										on:click|stopPropagation
									>
										<span class="underline">{getFileName(childAsset.file_legalitas)}</span>
									</a>
								</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Power of Attorney</span>
								<span class="ml-2 mr-4">:</span>
								<span>
									<a
										href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={childAsset.surat_kuasa}"
										target="_blank"
										on:click|stopPropagation
									>
										<span class="underline">{getFileName(childAsset.surat_kuasa)}</span>
									</a>
								</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Tags</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.tags ? setTags(childAsset.tags) : ''}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Utility</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.usage ? setUsage(childAsset.usage) : ''}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Value</span>
								<span class="ml-2 mr-4">:</span>
								<span>Rp {childAsset.nilai.toLocaleString('id-ID')}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Area</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.luas} m²</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Condition</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.kondisi}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Koordinat</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.titik_koordinat}</span>
							</li>
							<li class="flex">
								<span class="min-w-[190px] font-semibold">Coordinate Boundaries</span>
								<span class="ml-2 mr-4">:</span>
								<span>{childAsset.batas_koordinat}</span>
								<!-- <div>
									{#each childAsset.coordinateBoundaries.split('\n') as boundary}
										<p>{boundary}</p>
									{/each}
								</div> -->
							</li>
						</ul>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="flex justify-between">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={() => joinChild(asset.id_asset)}
			>
				Join Asset ID
			</button>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				on:click={() => createChild(asset.id_asset)}
			>
				Add Asset ID
			</button>
			<div class="w-1/3"></div>
		</div>
	</div>
</div>

<style>
	.map-wrap {
		position: relative;
		width: 100%;
		height: 400px;
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
