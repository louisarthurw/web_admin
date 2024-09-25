<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	import Swal from 'sweetalert2';

	export let data;
	const allSurveyors = data.allSurveyors;
	const surveyorAktif = data.surveyorAktif;
	const allAssets = data.allAssets;

	let map;
	let mapContainer;
	let mapController;
	const apiKey = 'Y8hoteSrnHNMgKTo6vpx';

	let GeocodingControl;
	let maptilersdk;

	const serverDetails = get(server);

	const initialState = { lng: 116.0012, lat: -2.0149, zoom: 4.5 };

	let selectedMarker = null;
	let radius = 0.5;
	let showRadiusInput = false;

	function createGeoJSONCircle(center, radiusInKm, points = 128) {
		const coords = {
			latitude: center[1],
			longitude: center[0]
		};

		const km = radiusInKm;

		const ret = [];
		const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
		const distanceY = km / 110.574;

		// for (let i = 0; i < points; i++) {
		// 	const theta = (i / points) * (2 * Math.PI);
		// 	const x = distanceX * Math.cos(theta);
		// 	const y = distanceY * Math.sin(theta);

		// 	const newLat = coords.latitude + y;
		// 	const newLng = coords.longitude + x;

		// 	ret.push([newLng, newLat]);
		// }

		// ret.push(ret[0]);
		console.log(ret);

		return {
			type: 'Feature',
			geometry: {
				type: 'Polygon',
				coordinates: [ret]
			}
		};
	}

	onMount(async () => {
		if (mapContainer) {
			const sdkModule = await import('@maptiler/sdk');
			const { Map, MapStyle, Marker, config, Popup } = sdkModule;
			const { createMapLibreGlMapController } = await import(
				'@maptiler/geocoding-control/maplibregl'
			);
			config.apiKey = apiKey;

			GeocodingControl = (
				await import('@maptiler/geocoding-control/svelte/GeocodingControl.svelte')
			).default;
			maptilersdk = await import('@maptiler/sdk');

			map = new Map({
				container: mapContainer,
				style: MapStyle.STREETS,
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom
			});

			mapController = createMapLibreGlMapController(map, maptilersdk);

			allAssets.forEach((asset) => {
				if (asset.titik_koordinat !== '') {
					const coords = asset.titik_koordinat.split(',').map((coord) => coord.trim());

					if (coords.length === 2) {
						const lng = parseFloat(coords[0]);
						const lat = parseFloat(coords[1]);

						if (!isNaN(lat) && !isNaN(lng)) {
							const popup = new Popup().setHTML(`
					<div class="text-center p-2">
						<p class="font-bold text-[#18294E] text-lg">${asset.nama}</p>
					</div>
				`);

							const marker = new Marker({ color: '#18294E' })
								.setLngLat([lng, lat])
								.setPopup(popup)
								.addTo(map);

							marker.getElement().addEventListener('click', () => {
								map.flyTo({ center: [lng, lat], zoom: 18 });

								selectedMarker = marker;
								showRadiusInput = true;

								if (map.getLayer('asset-circle-layer')) {
									map.removeLayer('asset-circle-layer');
									map.removeSource('asset-circle-source');
								}

								const circleGeoJSON = createGeoJSONCircle([lng, lat], radius);

								map.addSource('asset-circle-source', {
									type: 'geojson',
									data: circleGeoJSON
								});

								map.addLayer({
									id: 'asset-circle-layer',
									type: 'fill',
									source: 'asset-circle-source',
									layout: {},
									paint: {
										'fill-color': '#007cbf',
										'fill-opacity': 0.3
									}
								});

								popup.on('close', () => {
									if (map.getLayer('asset-circle-layer')) {
										map.removeLayer('asset-circle-layer');
										map.removeSource('asset-circle-source');
									}
									showRadiusInput = false;
									radius = 0.5;
								});
							});

							allSurveyors.forEach((surveyor) => {
								if (surveyor.lokasi) {
									const el = document.createElement('div');
									el.className = 'custom-marker';

									if (surveyor.availability_surveyor === 'Y') {
										el.style.backgroundImage = 'url(/surveyor_active.png)';
									} else if (surveyor.availability_surveyor === 'N') {
										el.style.backgroundImage = 'url(/surveyor_inactive.png)';
									}

									el.style.backgroundSize = 'cover';
									el.style.width = '16px';
									el.style.height = '16px';

									const surveyorCoords = surveyor.lokasi.split(',').map((coord) => coord.trim());

									if (surveyorCoords.length === 2) {
										const surveyorLng = parseFloat(surveyorCoords[0]);
										const surveyorLat = parseFloat(surveyorCoords[1]);

										if (!isNaN(surveyorLng) && !isNaN(surveyorLat)) {
											const marker = new Marker({ element: el })
												.setLngLat([surveyorLng, surveyorLat])
												.addTo(map);

											const availabilityColor =
												surveyor.availability_surveyor === 'Y' ? '#00FF38' : '#FF0000';
											const popupContent = `
		<form
			action="?/createSurveyReq"
			method="post"
			enctype="multipart/form-data"
		>
			<div class="p-2 space-y-2 w-72">
			<div>
				<div class="flex justify-between items-center">
					<p class="font-bold text-[#18294E] text-lg">${surveyor.nama_lengkap}</p>
					<span style="background-color: ${availabilityColor}; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
				</div>
				<p class="text-[#18294E] text-sm">Location: ${surveyor.lokasi}</p>
			</div>
			${
				surveyor.availability_surveyor === 'Y'
					? `
				<div>
					<label class="text-[#18294E] font-semibold" for="asset">Asset</label>
					<select
					name="asset_id"
					id="asset-select-${surveyor.user_id}"
					class="w-full text-sm p-2 border border-gray-300 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					>
					</select>
				</div>
				<div>
					<input type="hidden" name="user_id" value=${surveyor.user_id} />
				</div>
				<div>
					<label class="text-[#18294E] font-semibold" for="dateline">Dateline</label>
					<input
					name="dateline"
					type="date"
					class="w-full text-sm font-semibold p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					/>
				</div>
				<div>
					<label class="text-[#18294E] font-semibold" for="surat">Letter of Assignment</label>
					<input
					name="surat"
					type="file"
					class="w-full text-sm font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					/>
				</div>

				<button type="submit" class="w-full bg-[#18294E] text-white py-2 px-4 rounded">ASSIGN</button>
				`
					: ''
			}
			</div>
		</form>
        `;

											const popupAssign = new Popup({ maxWidth: '350px' }).setHTML(popupContent);
											marker.setPopup(popupAssign);

											marker.getElement().addEventListener('click', () => {
												map.flyTo({
													center: [
														surveyorLng,
														surveyor.availability_surveyor === 'Y'
															? surveyorLat + 0.0005
															: surveyorLat
													],
													zoom: 18
												});

												setTimeout(() => {
													const selectElement = document.getElementById(
														`asset-select-${surveyor.user_id}`
													);

													if (selectElement) {
														selectElement.innerHTML =
															'<option value="" class="text-gray-500" disabled selected>Choose Asset</option>';
														allAssets.forEach((asset) => {
															const option = document.createElement('option');
															option.value = asset.id_asset;
															option.textContent = asset.nama;
															selectElement.appendChild(option);
														});
													}
												}, 100);
											});
										}
									}
								} else {
									console.warn(`No lokasi provided for surveyor: ${surveyor.nama_lengkap}`);
								}
							});
						}
					}
				} else {
					console.warn(
						`No coordinates provided for asset ID: ${asset.id_asset}, Name: ${asset.nama}`
					);
				}
			});
		}
	});

	$: if (selectedMarker && map.getSource('asset-circle-source')) {
		const lngLat = selectedMarker.getLngLat();
		const newCircleGeoJSON = createGeoJSONCircle([lngLat.lng, lngLat.lat], radius);

		map.getSource('asset-circle-source').setData(newCircleGeoJSON);
	}

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

	/** @type {import('./$types').ActionData} */
	export let form;

	if (form) {
		if (form?.success) {
			Swal.fire({
				icon: 'success',
				title: 'Berhasil Assign Surveyor!',
				text: form.message
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Gagal Assign Surveyor!',
				text: form.message
			});
		}
	}
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="relative">
	<div class="map-wrap">
		<div class="map" bind:this={mapContainer}></div>
		{#if mapController}
			<div class="geocoding">
				<GeocodingControl
					{mapController}
					{apiKey}
					{maptilersdk}
					country={['ID']}
					placeholder="Insert Location"
					limit="8"
				/>
			</div>
		{/if}
	</div>

	<div class="absolute bottom-0 left-0 right-0 mx-8 mb-4 rounded-lg z-10">
		<div class="flex justify-between items-center space-x-2">
			{#if showRadiusInput}
				<div class="flex items-center w-3/12 bg-white px-4 py-2 rounded-lg">
					<label for="radius" class="font-semibold text-lg mr-2 text-[#18294E]">Radius:</label>
					<input
						name="radius"
						bind:value={radius}
						type="number"
						placeholder="Enter radius"
						min="0"
						step="0.1"
						class="w-full py-2 border border-gray-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					/>
					<span class="text-lg ml-2 text-[#18294E]">km</span>
				</div>
			{/if}

			<!-- <div class="flex items-center w-8/12 bg-white px-4 py-2 rounded-lg">
				<label
					for="surveyorName"
					class="font-semibold text-lg text-[#18294E] whitespace-nowrap mr-2">Surveyor Name:</label
				>
				<select
					name="surveyorName"
					class="w-full p-2 border border-gray-300 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedSurveyor ===
					''
						? 'text-gray-500'
						: 'text-black font-semibold'}"
					bind:value={selectedSurveyor}
					required
				>
					<option value="" class="text-gray-500" disabled selected>Choose Surveyor</option>
					{#each surveyorAktif as surveyor}
						<option value={surveyor.user_id} class="text-black font-semibold"
							>{surveyor.nama_lengkap}</option
						>
					{/each}
				</select>
			</div>

			<div class="flex items-center w-1/12 h-full bg-white rounded-lg">
				<button class="bg-[#18294E] p-4 text-white text-lg font-semibold size-full rounded-lg"
					>Assign</button
				>
			</div> -->
		</div>
	</div>
</div>

<style>
	.map-wrap {
		position: relative;
		width: 100%;
		height: calc(100vh - 117.6px); /* calculate height of the screen minus the heading */
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.geocoding {
		position: absolute;
		top: 10px;
		left: 10px;
	}

	@media (max-width: 767px) {
		.map-wrap {
			height: calc(100vh - 97.6px);
		}
	}
</style>
