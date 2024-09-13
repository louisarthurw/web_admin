// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { user_id } = params;
    const { asset_id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/progress/user/notdone/${user_id}/${asset_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const availableProgress = result.data;

    return {
        availableProgress: availableProgress
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addMeeting: async ({ request, params }) => {
        const { user_id } = params;
        const { asset_id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        let response = '';

        payload.append('id', String(entries.id));
        payload.append('tanggal_meeting', String(entries.tanggal_meeting));
        payload.append('waktu_meeting', String(entries.waktu_mulai) + ":00");
        payload.append('tempat_meeting', String(entries.tempat_meeting));
        payload.append('waktu_mulai', String(entries.waktu_mulai) + ":00");
        payload.append('waktu_selesai', String(entries.waktu_selesai) + ":00");
        payload.append('notes', String(entries.notes));

        if (entries.dokumen && entries.dokumen.size > 0) {
            payload.append('dokumen', entries.dokumen);
            payload.append('tipe_dokumen', entries.tipe_dokumen ? String(entries.tipe_dokumen) : "");
            response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/progress`, {
                method: 'POST',
                body: payload
            });
        } else {
            response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/progress/nodocument`, {
                method: 'POST',
                body: payload
            });
        }

        const result = await response.json();

        console.log(result)

        if (result.status === 200) {
            return { message: result.message }
        } else {
            return fail(400, { message: result.message });
        }
    }
};