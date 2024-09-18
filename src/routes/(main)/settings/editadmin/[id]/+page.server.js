// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const responseAdmin = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultAdmin = await responseAdmin.json();
    const admin = resultAdmin.data;

    const responseRoles = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin/role`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultRoles = await responseRoles.json();
    const roles = resultRoles.data;

    return {
        admin: admin,
        roles: roles
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editAdmin: async ({ request, params }) => {
        const { id } = params;
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            id: parseInt(id),
            role: entries.role
        };

        console.log(payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin/role`, {
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