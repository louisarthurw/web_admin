// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/survey_req/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const surveyData = result.data;

    return {
        surveyData: surveyData
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    verificate: async ({ request, params }) => {
        const { id } = params;
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            surveyreq_id: parseInt(id),
            senderId: parseInt(idAdmin),
        };

        console.log(payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/verify/asset/accept`, {
            method: 'PUT',
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