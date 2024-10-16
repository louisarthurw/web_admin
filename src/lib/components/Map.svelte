<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	let map;
	let mapContainer;

	const serverDetails = get(server);
	const initialState = { lat: -2.149, lng: 116.0012, zoom: 4.5 };

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

			try {
				const response = await fetch(
					`http://${serverDetails.hostname}:${serverDetails.port}/asset`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
							'Access-Control-Allow-Methods': '*',
							'Access-Control-Allow-Headers': '*'
						}
					}
				);

				const data = await response.json();
				console.log(data);
				if (data.data) {
					data.data.forEach((asset) => {
						if (asset.titik_koordinat) {
							const [lat, lng] = asset.titik_koordinat
								.split(',')
								.map((coord) => parseFloat(coord.trim()));

							if (!isNaN(lat) && !isNaN(lng)) {
								const popup = new Popup().setHTML(`
								<div class="text-center space-y-2">
									<p class="font-bold text-[#18294E] text-lg">${asset.nama}</p>
									<button class="zoom-button w-full p-2 bg-[#18294E] text-white text-md font-semibold rounded hover:bg-[#0f1c33] transition-colors">Zoom</button>
								</div>`);

								popup.on('open', () => {
									const zoomButton = marker.getPopup().getElement().querySelector('.zoom-button');
									zoomButton.addEventListener('click', () => {
										map.flyTo({ center: [lng, lat], zoom: 18 });
										marker.getPopup().remove();
									});
								});

								const marker = new Marker({ color: '#18294E' })
									.setLngLat([lng, lat])
									.setPopup(popup)
									.addTo(map);
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
				}
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
</div>

<style>
	.map-wrap {
		position: relative;
		width: 100%;
		height: calc(100vh - 68.8px); /* calculate height of the screen minus the heading */
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 767px) {
		.map-wrap {
			height: calc(100vh - 48.8px);
		}
	}
</style>
