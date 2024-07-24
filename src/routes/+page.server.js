// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);

        const payload = {
            username: entries.username,
            password: entries.password
        };

        const response = await fetch('http://localhost:2681/user/auth', {
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
        // console.log("result: ", result)

        if (result.status === 200) {
            const authValue = {
                id: result.data.id,
                username: result.data.username,
                nama_lengkap: result.data.nama_lengkap,
                email: result.data.email,
                nomor_telepon: result.data.nomor_telepon,
                alamat: result.data.alamat,
                tanggal_lahir: result.data.tanggal_lahir,
                jenis_kelamin: result.data.jenis_kelamin,
                foto_profil: result.data.foto_profil
            };

            cookies.set('auth', JSON.stringify(authValue), {
                maxAge: 60 * 60 * 24,
                sameSite: 'strict',
                path: '/',
                secure: false,
                httpOnly: false
            });

            return { message: result.message }
        } else {
            return fail(400, { message: result.message });
        }
    }
};
