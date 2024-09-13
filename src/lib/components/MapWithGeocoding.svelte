<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	let map;
	let mapContainer;
	let mapController;
	const apiKey = 'Y8hoteSrnHNMgKTo6vpx';

	let GeocodingControl;
	let maptilersdk;

	const serverDetails = get(server);

	const initialState = { lng: 116.0012, lat: -2.0149, zoom: 4.5 };

	const surveyorCoordinate = [
		{ lng: 112.6838913, lat: -7.280575722684924, name: 'Surveyor 1', status: 'active' },
		{ lng: 106.89721475830247, lat: -6.148511081300247, name: 'Surveyor 2', status: 'inactive' },
		{ lng: 112.73808057018923, lat: -7.33972368624985, name: 'Surveyor 3', status: 'active' },
		{ lng: 112.73740804720161, lat: -7.33877809989386, name: 'Surveyor 4', status: 'inactive' }
	];

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

			try {
				const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': '*',
						'Access-Control-Allow-Headers': '*'
					}
				});

				const data = await response.json();
				data.data.forEach((asset) => {
					if (asset.titik_koordinat) {
						const [lng, lat] = asset.titik_koordinat
							.split(',')
							.map((coord) => parseFloat(coord.trim()));

						if (!isNaN(lat) && !isNaN(lng)) {
							const popup = new Popup().setHTML(`
								<div class="text-center p-2">
									<p class="font-bold text-[#18294E] text-lg">${asset.nama}</p>
								</div>`);

							const marker = new Marker({ color: '#18294E' })
								.setLngLat([lng, lat])
								.setPopup(popup)
								.addTo(map);

							marker.getElement().addEventListener('click', () => {
								map.flyTo({ center: [lng, lat], zoom: 18 });
							});

							surveyorCoordinate.forEach((surveyorCoordinate) => {
								const el = document.createElement('div');
								el.className = 'custom-marker';
								if (surveyorCoordinate.status === 'active') {
									el.style.backgroundImage = 'url(/surveyor_active.png)';
								} else if (surveyorCoordinate.status === 'inactive') {
									el.style.backgroundImage = 'url(/surveyor_inactive.png)';
								}
								el.style.backgroundSize = 'cover';
								el.style.width = '16px';
								el.style.height = '16px';

								const marker = new Marker({ element: el })
									.setLngLat([surveyorCoordinate.lng, surveyorCoordinate.lat])
									.addTo(map);

								marker.getElement().addEventListener('click', () => {
									alert(`nama surveyor: ${surveyorCoordinate.name}`);
								});
							});
						} else {
							console.warn(
								`Invalid coordinates for asset ID: ${asset.id_asset}, Name: ${asset.nama}`
							);
						}
					} else {
						console.warn(
							`No coordinates provided for asset ID: ${asset.id_asset}, Name: ${asset.nama}`
						);
					}
				});
			} catch (error) {
				console.error('Error fetching assets:', error);
			}
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

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
