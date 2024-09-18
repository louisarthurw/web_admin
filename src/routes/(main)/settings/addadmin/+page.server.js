// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/privrole`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const roles = result.data;

    return {
        roles: roles
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addAdmin: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        payload.append('nama', String(entries.nama));
        payload.append('username', String(entries.username));
        payload.append('password', String(entries.password));
        payload.append('email', String(entries.email));
        payload.append('no_telp', String(entries.no_telp));
        payload.append('foto_profil', entries.foto_profil);
        payload.append('role', String(entries.role));

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/user/admin`, {
            method: 'POST',
            body: payload
        });

        const result = await response.json();

        if (result.status === 200) {
            return { message: result.message }
        } else {
            return fail(400, { message: result.message });
        }
    }
};