// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { server, auth } from '$lib/store';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor`, {
        method: 'GET',
    });

    const result = await response.json();
    const allSurveyors = result.data;

    const responseSurveyorAktif = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor/aktif`, {
        method: 'GET',
    });

    const resultSurveyorAktif = await responseSurveyorAktif.json();
    const surveyorAktif = resultSurveyorAktif.data;

    const responseAsset = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset`, {
        method: 'GET',
    });

    const resultAsset = await responseAsset.json();
    const allAssets = resultAsset.data;

    return {
        allSurveyors: allSurveyors,
        surveyorAktif: surveyorAktif,
        allAssets: allAssets
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    createSurveyReq: async ({ request }) => {
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        payload.append('idAsset', String(entries.asset_id));
        payload.append('idUser', String(entries.user_id));
        payload.append('dateline', String(entries.dateline));
        payload.append('surat', entries.surat);
        payload.append('senderId', idAdmin);

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/survey_req`, {
            method: 'POST',
            body: payload
        });

        const result = await response.json();

        console.log("result: ", result)

        if (result.status === 200) {
            return { success: true, message: result.message }
        } else {
            return fail(400, { success: false, message: result.message });
        }
    }
};