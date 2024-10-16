<script>
	// @ts-nocheck
	import Navbar3 from '$lib/components/Navbar3.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { server, auth } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const surveyData = data.surveyData;
	const serverDetails = get(server);
	console.log(surveyData);

	// let formElement;

	let map;
	let mapContainer;
	let coordinate = surveyData.titik_koordinat_new.split(',');
	let coordinateBoundaries;
	const initialState = { lng: coordinate[1], lat: coordinate[0], zoom: 18 };

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

			coordinateBoundaries = surveyData.batas_koordinat_new.split('\n');
			const polygonCoordinates = [];
			console.log(coordinateBoundaries);

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

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		const confirm = await Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to verify this survey request?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, verify it!',
			cancelButtonText: 'No, cancel'
		});

		if (confirm.isConfirmed) {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (response.status === 200) {
				await Swal.fire({
					icon: 'success',
					title: 'Berhasil Verifikasi Survey Request!',
					text: result.message
				});
				goto('/aset/verif');
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Gagal Verifikasi Survey Request!',
					text: result.message
				});
			}
		}
	};

	function back() {
		goto(`/aset/verif`);
	}

	function reassign(id) {
		goto(`/surveyor/tasklist/reassign/${id}`);
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

	function getUsages(arrayUsage) {
		return arrayUsage.map((item) => item.nama).join(', ');
	}

	function getTags(arrayTag) {
		return arrayTag.map((item) => item.nama).join(', ');
	}

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{surveyData.nama_aset}</h1>
	<form class="space-y-2" action="?/verificate" method="post" on:submit={handleSubmit}>
		<div>
			<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
			<input
				id="assetId"
				value={surveyData.id_asset}
				type="text"
				placeholder="Asset ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				value={surveyData.lokasi_asset}
				type="text"
				placeholder="Location"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				value={getAssetType(surveyData.tipe_asset)}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="uasge">Usage</label>
			<input
				id="usage"
				value={getUsages(surveyData.usage_new)}
				type="text"
				placeholder="usage"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="tags">Tags</label>
			<input
				id="tags"
				value={getTags(surveyData.tags_new)}
				type="text"
				placeholder="tags"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalArea">Total Area</label>
			<input
				id="totalArea"
				value="{surveyData.luas_new} m²"
				type="text"
				placeholder="Total Area"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalValue">Total Value</label>
			<input
				id="totalValue"
				value="Rp. {surveyData.nilai_new.toLocaleString('id-ID')}"
				type="text"
				placeholder="Total Value"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		{#if surveyData.gambar_new}
			<div>
				<label class="text-[#18294E] font-semibold" for="image">Image</label>
				<div class="flex space-x-4">
					{#each surveyData.gambar_new as gambar, i}
						<img
							src={`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`}
							alt="{surveyData.nama_aset} image {i + 1}"
							class="w-48 h-48 object-cover rounded-md"
						/>
					{/each}
				</div>
			</div>
		{/if}
		<div>
			<label class="text-[#18294E] font-semibold" for="condition">Condition</label>
			<textarea
				id="condition"
				value={surveyData.kondisi_new}
				type="text"
				placeholder="Condition"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="3"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinate">Coordinate</label>
			<input
				id="coordinate"
				value={surveyData.titik_koordinat_new}
				type="text"
				placeholder="Coordinate"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="coordinateBoundaries"
				>Coordinate Boundaries</label
			>
			<textarea
				id="coordinateBoundaries"
				value={surveyData.batas_koordinat_new}
				type="text"
				placeholder="Coordinate Boundaries"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				disabled
			/>
		</div>
		{#if coordinate.length > 1}
			<div class="map-wrap">
				<div class="map" bind:this={mapContainer}></div>
			</div>
		{/if}

		<div class="flex justify-between pt-8">
			{#if surveyData.status_verifikasi === 'N'}
				<div class="w-1/4"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				{#if privilege_id.includes(7)}
					<button
						type="button"
						on:click={() => reassign(surveyData.id_transaksi_jual_sewa)}
						class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>
						REASSIGN
					</button>
				{/if}
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140]
					transition duration-200 ml-4"
				>
					VERIFICATE
				</button>
				<div class="w-1/4"></div>
			{:else if surveyData.status_verifikasi === 'V'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				<div class="w-1/3"></div>
			{:else if surveyData.status_verifikasi === 'R'}
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={back}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				>
					BACK
				</button>
				{#if privilege_id.includes(7)}
					<button
						type="button"
						on:click={() => reassign(surveyData.id_transaksi_jual_sewa)}
						class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>
						REASSIGN
					</button>
				{/if}
				<div class="w-1/3"></div>
			{/if}
		</div>
	</form>
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
