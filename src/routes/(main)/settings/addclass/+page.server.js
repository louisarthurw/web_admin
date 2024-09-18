// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

const serverDetails = get(server);

/** @type {import('./$types').Actions} */
export const actions = {
    addClass: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            nama: entries.nama,
            minimum: entries.minimum,
            maximum: entries.maximum,
        };

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/kelas`, {
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