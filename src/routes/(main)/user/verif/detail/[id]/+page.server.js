// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/perusahaan/verify/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const companyVerifReq = result.data;

    const responseKelas = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/kelas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultKelas = await responseKelas.json();
    const allClasses = resultKelas.data;

    const responseBusinessField = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/business_field`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultBusinessField = await responseBusinessField.json();
    const allBusinessFields = resultBusinessField.data;

    return {
        companyVerifReq: companyVerifReq,
        allClasses: allClasses,
        allBusinessFields: allBusinessFields
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    acceptCompanyVerifReq: async ({ request, params }) => {
        const { id } = params;
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            perusahaan_id: parseInt(id),
            kelas: parseInt(entries.kelas),
            business_field: entries.selectedField,
            senderId: parseInt(idAdmin)
        };

        console.log("payload: ", payload)

        if (payload.business_field === '') {
            return fail(400, { message: 'Pilih setidaknya 1 business field!' });
        }

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/verify/perusahaan/accept`, {
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
    },

    declineCompanyVerifReq: async ({ request, params }) => {
        const { id } = params;
        const authValue = get(auth);
        const idAdmin = authValue.id;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            perusahaan_id: parseInt(id),
            decline_message: entries.alasan,
            senderId: parseInt(idAdmin)
        };

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/verify/perusahaan/decline`, {
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