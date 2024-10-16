// @ts-nocheck
import { server } from '$lib/store';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const assets = result.data;

    const totalAsset = assets ? assets.length : 0;
    const totalLand = assets ? assets.filter(asset => asset.tipe === 'L').length : 0;
    const totalBuilding = assets ? assets.filter(asset => asset.tipe === 'B').length : 0;
    const totalApartmentRoom = assets ? assets.filter(asset => asset.tipe === 'A').length : 0;

    return {
        totalAsset: totalAsset,
        totalLand: totalLand,
        totalBuilding: totalBuilding,
        totalApartmentRoom: totalApartmentRoom
    }
}