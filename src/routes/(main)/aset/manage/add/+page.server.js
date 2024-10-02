// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);
const authValue = get(auth)

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/user/perusahaan/joined/${authValue.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const userCompany = result.data;

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

    const responseProvinces = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/provinsi`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const resultProvinces = await responseProvinces.json();
    const provinces = resultProvinces.data;

    return {
        userCompany: userCompany,
        usage: usage,
        tags: tags,
        provinces: provinces
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addAsset: async ({ request }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);
        const files = formData.getAll('image');

        const payload = new FormData();

        payload.append('nama', String(entries.nama));
        payload.append('tipe', String(entries.tipe));
        payload.append('usage', String(entries.usage));
        payload.append('tags', String(entries.tag));
        payload.append('surat_legalitas', String(entries.surat_legalitas));
        payload.append('nomor_legalitas', String(entries.nomor_legalitas));
        payload.append('file_legalitas', entries.file_legalitas);
        payload.append('surat_kuasa', entries.surat_kuasa);
        files.forEach((file) => {
            payload.append('GambarFile', file);
        });
        payload.append('status', String(entries.status));
        payload.append('alamat', String(entries.alamat));
        payload.append('provinsi', String(entries.provinsi));
        payload.append('kondisi', String(entries.kondisi));
        payload.append('titik_koordinat', String(entries.titik_koordinat));
        payload.append('batas_koordinat', String(entries.batas_koordinat));
        payload.append('luas', String(entries.luas));
        payload.append('nilai', String(entries.nilai));

        if (payload.get('usage') === '') {
            return fail(400, { message: 'Pilih setidaknya 1 usage!' });
        }
        if (payload.get('tags') === '') {
            return fail(400, { message: 'Pilih setidaknya 1 tag!' });
        }

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/gambar`, {
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