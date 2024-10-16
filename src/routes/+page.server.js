// @ts-nocheck
import { server, auth } from '$lib/store';
import { fail, redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

const serverDetails = get(server);

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            username: entries.username,
            password: entries.password
        };

        const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/admin`, {
            method: 'POST',
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
            const authValue = {
                alamat: result.data.alamat,
                email: result.data.email,
                foto_profil: result.data.foto_profil,
                id: result.data.id,
                jenis_kelamin: result.data.jenis_kelamin,
                ktp: result.data.ktp,
                nama_lengkap: result.data.nama_lengkap,
                nomor_telepon: result.data.nomor_telepon,
                privileges: result.data.privileges,
                role_id: result.data.role_id,
                role_nama: result.data.role_nama,
                status: result.data.status,
                tanggal_lahir: result.data.tanggal_lahir,
                username: result.data.username
            };

            cookies.set('auth', JSON.stringify(authValue), {
                maxAge: 60 * 60 * 24,
                sameSite: 'strict',
                path: '/',
                secure: false,
                httpOnly: false
            });

            auth.set(authValue);
            console.log(get(auth))

            return { message: result.message, authh: authValue }
        } else {
            return fail(400, { message: result.message });
        }
    }
};
