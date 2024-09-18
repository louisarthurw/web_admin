// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const responseAdmin = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultAdmin = await responseAdmin.json();
    const admins = resultAdmin.data;

    const responseRole = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/privrole`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultRole = await responseRole.json();
    const roles = resultRole.data;

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
        admins: admins,
        roles: roles,
        businessClass: businessClass
    }
}