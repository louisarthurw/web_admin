<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const survey_req = data.survey_req;
	const surveyors = data.surveyors;

	let id = $page.params.id;
	const serverDetails = get(server);
	let dateline = '';

	let map;
	let mapContainer;
	let coordinate = survey_req.titik_koordinat_new.split(',');
	let coordinateBoundaries;
	const initialState = { lat: coordinate[0], lng: coordinate[1], zoom: 18 };

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

			coordinateBoundaries = survey_req.batas_koordinat_new.split('\n');
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

	function handleBack() {
		goto(`/aset/verif/detail/${id}`);
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
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">Reassign Surveyor</h1>
	<form
		class="flex flex-col flex-grow space-y-2"
		action="?/reassignSurveyor"
		enctype="multipart/form-data"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil reassign surveyor!',
						text: result.data.message
					}).then(() => {
						goto('/aset/verif');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal reassign surveyor!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="selectedAsset">Selected Asset</label>
			<input
				id="selectedAsset"
				type="text"
				value={survey_req.nama_aset}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>

		<div>
			<label class="text-[#18294E] font-semibold" for="assetId">Asset ID</label>
			<input
				id="assetId"
				name="id_asset"
				type="text"
				value={survey_req.id_asset}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				type="text"
				value={survey_req.lokasi_asset}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				type="text"
				value={getAssetType(survey_req.tipe_asset)}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="usage">Usage</label>
			<input
				id="usage"
				type="text"
				value={getUsages(survey_req.usage_new)}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="tags">Tags</label>
			<input
				id="tags"
				type="text"
				value={getUsages(survey_req.tags_new)}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalArea">Total Area</label>
			<input
				id="totalArea"
				type="text"
				value="{survey_req.luas_new} m²"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="totalValue">Total Value</label>
			<input
				id="totalValue"
				type="text"
				value="Rp. {survey_req.nilai_new.toLocaleString('id-ID')}"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		{#if survey_req.gambar_new}
			<div>
				<label class="text-[#18294E] font-semibold" for="image">Image</label>
				<div class="flex space-x-4">
					{#each survey_req.gambar_new as gambar, i}
						<img
							src={`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`}
							alt="{survey_req.nama_aset} image {i + 1}"
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
				value={survey_req.kondisi_new}
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
				type="text"
				value={survey_req.titik_koordinat_new}
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
				value={survey_req.batas_koordinat_new}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				disabled
			/>
		</div>
		<div class="map-wrap">
			<div class="map" bind:this={mapContainer}></div>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="selectedSurveyor">Selected Surveyor</label>

			<select
				id="selectedSurveyor"
				name="user_id"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				value={survey_req.user_id}
				required
			>
				<option value="" disabled selected>Choose Surveyor</option>
				{#each surveyors as surveyor}
					<option value={surveyor.user_id} class="text-[#18294E] font-semibold"
						>{surveyor.nama_lengkap}</option
					>
				{/each}
			</select>
		</div>

		<div>
			<label class="text-[#18294E] font-semibold" for="dateline">Dateline</label>
			<input
				id="dateline"
				name="dateline"
				type="date"
				bind:value={dateline}
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {dateline ===
				''
					? 'text-gray-500'
					: 'text-[#18294E] font-semibold'}"
				required
			/>
		</div>

		<!-- <div>
			<label class="text-[#18294E] font-semibold" for="letterOfAssignment"
				>Letter of Assignment</label
			>
			<input
				id="letterOfAssignment"
				name="letterOfAssignment"
				type="text"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
				required
			/>
		</div> -->

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={handleBack}>CANCEL</button
			>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>REASSIGN</button
			>
			<div class="w-1/3"></div>
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
