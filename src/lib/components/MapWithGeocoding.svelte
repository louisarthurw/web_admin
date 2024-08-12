<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';

	let map;
	let mapContainer;
	let mapController;
	const apiKey = 'Y8hoteSrnHNMgKTo6vpx';

	let GeocodingControl;
	let maptilersdk;

	const initialState = { lng: 116.0012, lat: -2.0149, zoom: 4.5 };

	const markersData = [
		{ lng: 112.738035, lat: -7.339264, name: 'Gedung P' },
		{ lng: 106.816666, lat: -6.2, name: 'Gedung Jakarta' },
		{ lng: 115.0012, lat: -0.5149, name: 'Center Point' }
	];

	onMount(async () => {
		if (mapContainer) {
			const sdkModule = await import('@maptiler/sdk');
			const { Map, MapStyle, Marker, config } = sdkModule;
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

			markersData.forEach((markerData) => {
				const marker = new Marker({ color: '#FF0000' })
					.setLngLat([markerData.lng, markerData.lat])
					.addTo(map);

				marker.getElement().addEventListener('click', () => {
					alert(`nama asset: ${markerData.name}`);
				});
			});
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
			<svelte:component this={GeocodingControl} {mapController} {apiKey} {maptilersdk} country={["ID"]} placeholder="Insert Location" limit=8/> 
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
