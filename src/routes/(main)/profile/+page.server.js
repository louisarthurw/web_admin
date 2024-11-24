// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const authValue = get(auth);
    const idAdmin = authValue.id;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin/${idAdmin}`, {
        method: 'GET',
    });

    const result = await response.json();
    const user = result.data;

    return {
        user: user
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editProfile: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            id: parseInt(entries.worker_id),
            nama_lengkap: entries.nama,
            username: entries.username,
            password: entries.password,
            email: entries.email,
            no_telp: entries.phone_number
        };

        console.log(payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin`, {
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
        console.log(result)

        if (result.status === 200) {
            return { message: result.message, data: result.data }
        } else {
            return fail(400, { message: result.message });
        }
    }
};
