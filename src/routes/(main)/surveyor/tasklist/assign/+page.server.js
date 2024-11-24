// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
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
        assets: assets,
        surveyors: surveyors
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    assignSurveyor: async ({ request }) => {
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        let selected_asset_id = entries.selected_asset_id;
        selected_asset_id = selected_asset_id.split(',')
        const unique_id = new Set(selected_asset_id);

        if (unique_id.size !== selected_asset_id.length) {
            return fail(400, { message: 'Asset tidak boleh ada yang sama!' });
        }

        payload.append('idUser', parseInt(entries.user_id));
        payload.append('idAsset', selected_asset_id);
        payload.append('dateline', entries.dateline);
        payload.append('surat', entries.letterOfAssignment);
        payload.append('senderId', idAdmin);

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/survey_req`, {
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