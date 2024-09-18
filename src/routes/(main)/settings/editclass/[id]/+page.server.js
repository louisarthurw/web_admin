// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const responseClass = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/kelas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultClass = await responseClass.json();
    const businessClass = resultClass.data;

    return {
        businessClass: businessClass
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editClass: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            id: parseInt(id),
            nama: entries.nama,
            minimum: entries.minimum,
            maximum: entries.maximum,
        };

        if (parseInt(payload.minimum) >= parseInt(payload.maximum)) {
            return fail(400, { message: 'Modal maximum harus lebih besar dari modal minimum!' });
        }

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/kelas`, {
            method: 'PUT',
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