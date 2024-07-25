<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';

	let map;
	let mapContainer;

	const initialState = { lng: 115.0012, lat: -0.5149, zoom: 4.5 };

	const markersData = [
		{ lng: 112.738035, lat: -7.339264, name: 'Gedung P' },
		{ lng: 106.816666, lat: -6.2, name: 'Gedung Jakarta' },
		{ lng: 115.0012, lat: -0.5149, name: 'Center Point' }
	];

	onMount(async () => {
		if (mapContainer) {
			const { Map, MapStyle, Marker, config } = await import('@maptiler/sdk');
			config.apiKey = 'Y8hoteSrnHNMgKTo6vpx';

			map = new Map({
				container: mapContainer,
				style: MapStyle.STREETS,
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom
			});

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
</div>

<!-- <div class="relative h-[calc(100vh - 72.8px)] w-screen">
    <div class="absolute h-full w-full" bind:this={mapContainer}></div>
</div> -->

<style>
	.map-wrap {
		position: relative;
		width: 100%;
		height: calc(100vh - 72.8px); /* calculate height of the screen minus the heading */
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
