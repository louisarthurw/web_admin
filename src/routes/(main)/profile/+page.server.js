// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);
const authValue = get(auth)

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin/${authValue.id}`, {
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

        if (result.status === 200) {
            return { message: result.message }
        } else {
            return fail(400, { message: result.message });
        }
    }
};
