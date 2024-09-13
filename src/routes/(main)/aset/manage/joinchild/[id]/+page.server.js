// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/child/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const childAsset = result.data;

    return {
        childAsset: childAsset
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    joinChild: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        let selected_id = entries.selected_id
        selected_id = selected_id.split(',')
        const unique_id = new Set(selected_id);

        if (unique_id.size !== selected_id.length) {
            return fail(400, { message: 'Asset ID yang mau di join tidak boleh yang sama!' });
        }

        const payload = {
            id_asset_1: parseInt(selected_id[0]),
            id_asset_2: parseInt(selected_id[1])
        };
        console.log(payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.status === 200) {
            return { message: result.message }
        } else {
            return fail(400, { message: result.message });
        }
    }
};