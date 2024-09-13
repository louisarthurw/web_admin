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

    const totalAsset = assets.length;
    const totalLand = assets.filter(asset => asset.tipe === 'L').length;
    const totalBuilding = assets.filter(asset => asset.tipe === 'B').length;
    const totalApartmentRoom = assets.filter(asset => asset.tipe === 'A').length;

    return {
        totalAsset: totalAsset,
        totalLand: totalLand,
        totalBuilding: totalBuilding,
        totalApartmentRoom: totalApartmentRoom
    }
}