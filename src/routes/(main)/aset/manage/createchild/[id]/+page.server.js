// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);
const authValue = get(auth)

export const load = async () => {
    const responseUsage = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/usage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultUsage = await responseUsage.json();
    const usage = resultUsage.data;

    const responseTags = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultTags = await responseTags.json();
    const tags = resultTags.data;

    return {
        usage: usage,
        tags: tags,
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addChild: async ({ request, params }) => {
        const { id } = params;

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = new FormData();

        payload.append('nama', String(entries.nama));
        payload.append('tipe', String(entries.tipe));
        payload.append('usage', String(entries.usage));
        payload.append('tags', String(entries.tag));
        payload.append('surat_legalitas', String(entries.surat_legalitas));
        payload.append('nomor_legalitas', String(entries.nomor_legalitas));
        payload.append('file_legalitas', entries.file_legalitas);
        payload.append('surat_kuasa', entries.surat_kuasa);
        payload.append('gambar_asset', entries.image);
        payload.append('status', String(entries.status));
        payload.append('alamat', String(entries.alamat));
        payload.append('kondisi', String(entries.kondisi));
        payload.append('titik_koordinat', String(entries.titik_koordinat));
        payload.append('batas_koordinat', String(entries.batas_koordinat));
        payload.append('luas', String(entries.luas));
        payload.append('nilai', String(entries.nilai));
        payload.append('parentId', String(id))

        if (payload.get('usage') === '') {
            return fail(400, { message: 'Pilih setidaknya 1 usage!' });
        }
        if (payload.get('tag') === '') {
            return fail(400, { message: 'Pilih setidaknya 1 tag!' });
        }

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/child`, {
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