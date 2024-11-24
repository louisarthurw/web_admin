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
    });

    const result = await response.json();
    const survey_req = result.data;

    const responseAsset = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultAsset = await responseAsset.json();
    const assets = resultAsset.data;

    const responseSurveyor = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultSurveyor = await responseSurveyor.json();
    const surveyors = resultSurveyor.data;


    return {
        survey_req: survey_req,
        assets: assets,
        surveyors: surveyors
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    reassignSurveyor: async ({ request, params }) => {
        const { id } = params;
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            surveyreq_id: parseInt(id),
            user_id: parseInt(entries.user_id),
            dateline: entries.dateline,
            senderId: parseInt(idAdmin)
        };

        // payload.append('surveyreq_id', parseInt(id));
        // payload.append('surveyor_id', parseInt(entries.user_id));
        // payload.append('dateline', entries.dateline);
        // payload.append('surat', entries.letterOfAssignment);

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/verify/asset/reassign`, {
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