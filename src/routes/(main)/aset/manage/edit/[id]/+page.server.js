// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { get } from 'svelte/store';

const serverDetails = get(server);
const authValue = get(auth)

export const load = async ({ params }) => {
    const { id } = params

    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset/detail/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const asset = result.data;

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
        asset: asset,
        usage: usage,
        tags: tags,
        provinces: provinces
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    editAsset: async ({ request, params }) => {
        const { id } = params

        const formData = await request.formData();
        const entries = Object.fromEntries(formData);
        const gambar_lama = entries.gambar_lama.split(",");
        const gambar_new = formData.getAll('gambar_baru');

        const payload = new FormData();

        payload.append('id', String(id));
        payload.append('nama', String(entries.nama));
        payload.append('tipe', String(entries.tipe));
        payload.append('usage', String(entries.usage));
        payload.append('tags', String(entries.tag));
        payload.append('surat_legalitas', String(entries.surat_legalitas));
        payload.append('nomor_legalitas', String(entries.nomor_legalitas));

        if (typeof entries.file_legalitas === 'string') {
            const responseLegalityFile = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${entries.file_legalitas}`, {
                method: 'GET',
            });

            if (responseLegalityFile.ok) {
                const legalityFile = await responseLegalityFile.blob();
                payload.append('file_legalitas', legalityFile, (entries.file_legalitas.split('/').pop()).split('_').pop());
            } else {
                console.error('Error fetching file_legalitas');
            }
        } else {
            payload.append('file_legalitas', entries.file_legalitas);
        }

        if (typeof entries.surat_kuasa === 'string') {
            const responsePowerOfAttorney = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${entries.surat_kuasa}`, {
                method: 'GET',
            });

            if (responsePowerOfAttorney.ok) {
                const powerOfAttorney = await responsePowerOfAttorney.blob();
                payload.append('surat_kuasa', powerOfAttorney, (entries.surat_kuasa.split('/').pop()).split('_').pop());
            } else {
                console.error('Error fetching surat_kuasa');
            }
        } else {
            payload.append('surat_kuasa', entries.surat_kuasa);
        }

        if (gambar_lama.length > 0 && gambar_lama[0] !== '') {
            for (const gambar of gambar_lama) {
                try {
                    const responseGambar = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/file?path=${gambar}`, {
                        method: 'GET',
                    });

                    if (responseGambar.ok) {
                        const gambarr = await responseGambar.blob();
                        payload.append('GambarFile', gambarr, (gambar.split('/').pop()).split('_').pop());
                    } else {
                        console.error('Error fetching image');
                    }
                } catch (error) {
                    console.error('Error occurred while fetching image:', error);
                }
            }
        }

        if (gambar_new.length > 0) {
            gambar_new.forEach((gambar) => {
                payload.append('GambarFile', gambar);
            });
        }

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
        if (!payload.get('GambarFile')) {
            return fail(400, { message: 'Harus ada setidaknya 1 image!' });
        }

        console.log("payload: ", payload)

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/asset`, {
            method: 'PUT',
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