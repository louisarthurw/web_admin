// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/privrole/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const role = result.data;

    const responsePrivilege = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/priv`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultPrivilege = await responsePrivilege.json();
    const privileges = resultPrivilege.data;

    return {
        role: role,
        privileges: privileges
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editRole: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            id: parseInt(id),
            role: entries.nama,
            privilege: entries.privilege,
        };

        if (payload.privilege === '') {
            return fail(400, { message: 'Pilih setidaknya 1 privilege!' });
        }

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/role`, {
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