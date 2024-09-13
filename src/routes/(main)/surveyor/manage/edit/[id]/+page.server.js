// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const surveyor = result.data;

    return {
        surveyor: surveyor
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editSurveyor: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            user_id: parseInt(id),
            nama: entries.nama_lengkap,
            username: entries.username,
            password: entries.password,
            email: entries.email,
            notelp: entries.no_telp
        };

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor/user`, {
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