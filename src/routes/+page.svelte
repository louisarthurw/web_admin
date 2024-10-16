<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/store';
	import { get } from 'svelte/store';
	import Swal from 'sweetalert2';
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-[#FFFFFF]">
	<div class="flex justify-center mb-6">
		<img src="/logo.png" alt="Logo Crossnet" class="h-16" />
	</div>
	<div class="w-full max-w-lg p-6 bg-[#F2F3F7] rounded-lg shadow-md">
		<form
			action="?/login"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update({ reset: false });

					if (result.status === 200) {
						auth.set(result.data.authh);
						console.log(get(auth))
						Swal.fire({
							icon: 'success',
							title: 'Login berhasil!',
							text: result.data.message
						}).then(() => {
							goto('/home');
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Login gagal!',
							text: result.data.message
						});
					}
				};
			}}
		>
			<div class="mt-8 mb-2">
				<input
					class="w-full px-3 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] placeholder-gray-400"
					id="username"
					name="username"
					type="text"
					placeholder="Username"
					required
				/>
			</div>
			<div class="mt-1 mb-16">
				<input
					class="w-full px-3 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] placeholder-gray-400"
					id="password"
					name="password"
					type="password"
					placeholder="Password"
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
