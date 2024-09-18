// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

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

    const responseProvinces = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/provinsi`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultProvinces = await responseProvinces.json();
    const allProvinces = resultProvinces.data;

    const responseTagsUsed = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/tags/used`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultTagsUsed = await responseTagsUsed.json();
    const tagsUsed = resultTagsUsed.data;

    const responseProvinsiUsed = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/provinsi/used`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultProvinsiUsed = await responseProvinsiUsed.json();
    const provinsiUsed = resultProvinsiUsed.data;

    return {
        assets: assets,
        allProvinces: allProvinces,
        tagsUsed: tagsUsed,
        provinsiUsed: provinsiUsed
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    filterAsset: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            type: entries.type === 'undefined' ? '' : String(entries.type),
            status: entries.status === 'undefined' ? '' : String(entries.status),
            tag: String(entries.tag),
            provinsi: String(entries.province)
        };

        console.log('payload: ', payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/filter`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log('result: ', result)

        if (result.status === 200) {
            return result
        } else {
            return fail(400, { message: result.message });
        }
    }
}