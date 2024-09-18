// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;
    
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
        privileges: privileges
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addRole: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            role: entries.nama,
            privilege: entries.privilege
        };

        if (payload.privilege === '') {
            return fail(400, { message: 'Pilih setidaknya 1 privilege!' });
        }

        console.log(payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/role`, {
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