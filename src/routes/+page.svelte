<script>
	// @ts-nocheck

	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { user_id_login } from '../stores';
	import { user_name_login } from '../stores';
	import { nama_lengkap_login } from '../stores';
	import { email_login } from '../stores';
	import { nomor_telepon_login } from '../stores';
	import { alamat_login } from '../stores';
	import { tanggal_lahir_login } from '../stores';
	import { jenis_kelamin_login } from '../stores';
	import { foto_profil_login } from '../stores';

	let usernameinput = '';
	let passwordinput = '';

	async function cekLogin(event) {
		event.preventDefault();

		const payload = {
			username: usernameinput,
			password: passwordinput
		};

		// console.log('Payload:', payload);

		try {
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
			// console.log('response: ', response);

			const result = await response.json();
			console.log('result: ', result);
			// console.log('message: ', result.message);

			if (result.status === 200) {
				user_id_login.set(result.data.id)
				user_name_login.set(result.data.username)
				nama_lengkap_login.set(result.data.nama_lengkap)
				email_login.set(result.data.email)
				nomor_telepon_login.set(result.data.nomor_telepon)
				alamat_login.set(result.data.alamat)
				tanggal_lahir_login.set(result.data.tanggal_lahir)
				jenis_kelamin_login.set(result.data.jenis_kelamin)
				foto_profil_login.set(result.data.foto_profil)

				// console.log('user id: ', result.data.id);

				usernameinput = '';
				passwordinput = '';

				Swal.fire({
					icon: 'success',
					title: 'Login berhasil!',
					text: result.message
				}).then(() => {
					goto('/home');
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Login gagal!',
					text: result.message
				});
			}
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-[#FFFFFF]">
	<div class="flex justify-center mb-6">
		<img src="/logo.png" alt="Logo Crossnet" class="h-16" />
	</div>
	<div class="w-full max-w-lg p-6 bg-[#F2F3F7] rounded-lg shadow-md">
		<form on:submit={cekLogin}>
			<div class="mt-8 mb-2">
				<input
					class="w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E]"
					id="username"
					type="text"
					placeholder="Username"
					bind:value={usernameinput}
					required
				/>
			</div>
			<div class="mt-1 mb-16">
				<input
					class="w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E]"
					id="password"
					type="password"
					placeholder="Password"
					bind:value={passwordinput}
					required
				/>
			</div>
			<div class="flex items-center justify-center">
				<button
					type="submit"
					class="w-full px-3 py-1 font-bold text-white bg-[#18294E] rounded-md hover:bg-[#151E39]"
				>
					LOGIN
				</button>
			</div>
		</form>
	</div>
</div>
