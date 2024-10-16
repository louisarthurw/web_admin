import { writable } from 'svelte/store';

export const server = writable({
    hostname: 'leap.crossnet.co.id',
    port: 1762
});

let authData = null;

if (typeof document !== 'undefined') {
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='));
    if (authCookie) {
        authData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]));
    }
}

export const auth = writable(authData || {
    alamat: null,
    email: null,
    foto_profil: null,
    id: null,
    jenis_kelamin: null,
    ktp: null,
    nama_lengkap: null,
    nomor_telepon: null,
    privileges: [],
    role_id: null,
    role_nama: null,
    status: null,
    tanggal_lahir: null,
    username: null
});
