import { writable } from 'svelte/store';

export const server = writable({
    hostname: 'leap.crossnet.co.id',
    port: 1762
});

export const auth = writable({
    alamat: null,
    denied_by_admin: null,
    email: null,
    first_login: null,
    foto_profil: null,
    id: null,
    jenis_kelamin: null,
    ktp: null,
    nama_lengkap: null,
    nama_privilege: null,
    nomor_telepon: null,
    privilege_id: null,
    role_id: null,
    role_nama: null,
    status: null,
    tanggal_lahir: null,
    tipe: null,
    username: null
});
