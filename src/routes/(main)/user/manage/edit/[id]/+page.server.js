// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/user/detail/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const user = result.data;

    return {
        user: user
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editUser: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();
        payload.append('id', id);
        payload.append('nama_lengkap', entries.nama_lengkap);
        payload.append('username', entries.username);
        payload.append('password', entries.password);
        payload.append('email', entries.email);
        payload.append('no_telp', entries.phoneNumber);

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/user/id/nofoto`, {
            method: 'PUT',
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