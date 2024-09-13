// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

const serverDetails = get(server);

const authValue = get(auth);

/** @type {import('./$types').Actions} */
export const actions = {
    addSurveyor: async ({ request, cookies }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            registered_by: parseInt(authValue.id),
            username: entries.username,
            password: entries.password,
            nama_lengkap: entries.nama_lengkap,
            email: entries.email,
            no_telp: entries.no_telp
        };

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor`, {
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