// @ts-nocheck
import { server } from '$lib/store';
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

// /** @type {import('./$types').Actions} */
// export const actions = {
//     assignSurveyor: async ({ request }) => {
//         const formData = await request.formData();
//         const entries = Object.fromEntries(formData);

//         const payload = {
//             user_id: parseInt(entries.user_id),
//             id_asset: parseInt(entries.id_asset),
//             dateline: entries.dateline,
//         };

//         console.log(payload)

//         const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/survey_req`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': '*',
//                 'Access-Control-Allow-Headers': '*'
//             },
//             body: JSON.stringify(payload)
//         });

//         const result = await response.json();

//         if (result.status === 200) {
//             return { message: result.message }
//         } else {
//             return fail(400, { message: result.message });
//         }
//     }
// };

/** @type {import('./$types').Actions} */
export const actions = {
    assignSurveyor: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        payload.append('idUser',parseInt(entries.user_id));
        payload.append('idAsset', parseInt(entries.id_asset));
        payload.append('dateline', entries.dateline);
        payload.append('surat', entries.letterOfAssignment);

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