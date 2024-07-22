<script>
	// @ts-nocheck

	import { user_id_login } from '../../stores';
	import { user_name_login } from '../../stores';
	import { nama_lengkap_login } from '../../stores';
	import { email_login } from '../../stores';
	import { nomor_telepon_login } from '../../stores';
	import { alamat_login } from '../../stores';
	import { tanggal_lahir_login } from '../../stores';
	import { jenis_kelamin_login } from '../../stores';
	import { foto_profil_login } from '../../stores';

	let user_id;
	let username;
	let nama_lengkap;
	let email;
	let no_telp;
	let alamat;
	let tanggal_lahir;
	let jenis_kelamin;
	let foto_profil;

	user_id_login.subscribe((value) => (user_id = value));
	user_name_login.subscribe((value) => (username = value));
	nama_lengkap_login.subscribe((value) => (nama_lengkap = value));
	email_login.subscribe((value) => (email = value));
	nomor_telepon_login.subscribe((value) => (no_telp = value));
	alamat_login.subscribe((value) => (alamat = value));
	tanggal_lahir_login.subscribe((value) => (tanggal_lahir = value));
	jenis_kelamin_login.subscribe((value) => (jenis_kelamin = value));
	foto_profil_login.subscribe((value) => (foto_profil = value));

	// console.log('id: ', user_id);
	// console.log('username: ', username);
	// console.log('nama lengkap: ', nama_lengkap);
	// console.log('email: ', email);
	// console.log('no telp: ', no_telp);
	// console.log('alamat: ', alamat);
	// console.log('tanggal lahir: ', tanggal_lahir);
	// console.log('jenis kelamin: ', jenis_kelamin);
	// console.log('foto_profil: ', foto_profil);
</script>

<div class="flex items-center justify-between p-3 bg-white border-b border-gray-300">
	<h1 class="text-3xl text-[#18294E] font-bold ml-8">Hello, {nama_lengkap}!</h1>
	<nav class="flex gap-24">
		<a href="/home" class="text-lg text-[#18294E] font-bold hover:underline">Home</a>
		<a href="/surveyor" class="text-lg text-[#18294E] hover:underline">Surveyor</a>
		<a href="/aset" class="text-lg text-[#18294E] hover:underline">Asset</a>
		<a href="/user" class="text-lg text-[#18294E] hover:underline">User</a>
	</nav>
	<div class="flex items-center mr-8">
		<img src="default_profile_icon.png" alt="User Icon" class="w-12 h-12 rounded-full" />
	</div>
</div>
