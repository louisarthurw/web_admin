// @ts-nocheck
import { server } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async ({ params }) => {
    const { id } = params;

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/perusahaan/detail/${id}`, {
        method: 'GET'
    });

    const result = await response.json();
    const company = result.data;

    const responseBusinessField = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/business_field`, {
        method: 'GET'
    });

    const resultBusinessField = await responseBusinessField.json();
    const business_field = resultBusinessField.data;

    const responseKelas = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/kelas`, {
        method: 'GET'
    });

    const resultKelas = await responseKelas.json();
    const kelas = resultKelas.data;

    return {
        company: company,
        business_field: business_field,
        kelas: kelas
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editCompany: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            id: parseInt(id),
            username: entries.username,
            lokasi: entries.location,
            tipe: entries.type,
            deskripsi: entries.description,
            field: entries.selected_field,
            kelas: entries.kelas
        };

        console.log("payload: ", payload)

        if (payload.field === '') {
            return fail(400, { message: 'Pilih setidaknya 1 business field!' });
        }


        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/perusahaan`, {
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