<script>
	// @ts-nocheck
	import Navbar6 from '$lib/components/Navbar6.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';

	export let data;
	const admin = data.admin;
	const roles = data.roles;
	console.log(roles)
	let selectedRole = admin.user_role.role_id;

	const serverDetails = get(server);

	const handleCancel = () => {
		goto('/settings');
	};

	let isShowPassword = false;

	const showPassword = () => {
		isShowPassword = true;
	};

	const hidePassword = () => {
		isShowPassword = false;
	};

	function getFileName(path) {
		return path.split('/').pop();
	}
</script>

<div class="flex" style="min-height: calc(100vh - 68.8px);">
	<div class="w-[12.5%]">
		<Navbar6 currentPage={$page.url.pathname}></Navbar6>
	</div>

	<div class="flex flex-col flex-grow bg-gray-100 p-6 space-y-4">
		<h1 class="text-3xl font-bold text-[#18294E]">Edit Admin</h1>
		<form
			class="flex flex-grow flex-col space-y-4"
			action="?/editAdmin"
			enctype="multipart/form-data"
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update({ reset: false });

					if (result.status === 200) {
						Swal.fire({
							icon: 'success',
							title: 'Berhasil Edit Admin!',
							text: result.data.message
						}).then(() => {
							goto('/settings');
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Gagal Edit Admin!',
							text: result.data.message
						});
					}
				};
			}}
		>
			<div>
				<h2 class="text-lg font-semibold mb-1">Name</h2>
				<input
					name="nama"
					value={admin.nama_lengkap}
					type="text"
					placeholder="Name"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					readonly
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Username</h2>
				<input
					name="username"
					value={admin.username}
					type="text"
					placeholder="Username"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					readonly
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Password</h2>
				<input
					name="password"
					value={admin.password}
					type={isShowPassword ? 'text' : 'password'}
					on:focus={showPassword}
					on:blur={hidePassword}
					placeholder="Password"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					readonly
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Email</h2>
				<input
					name="email"
					value={admin.email}
					type="email"
					placeholder="Email"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					readonly
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Phone Number</h2>
				<input
					name="no_telp"
					value={admin.no_telp}
					type="tel"
					placeholder="Phone Number"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
					required
					readonly
				/>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Profile Picture</h2>
				<a
					href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={admin.foto_profil}"
					target="_blank"
				>
					<input
						name="foto_profil"
						value={getFileName(admin.foto_profil)}
						type="text"
						placeholder="Profile Picture"
						class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E]"
						required
						readonly
					/>
				</a>
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Role</h2>
				<select
					name="role"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] {selectedRole ===
					''
						? 'text-gray-500'
						: 'text-black font-semibold'}"
					value={selectedRole}
					required
				>
					<option value="" class="text-gray-500" disabled selected>Choose Role</option>
					{#each roles as role}
						<option value={role.role_id} class="text-black font-semibold">{role.nama_role}</option>
					{/each}
				</select>
			</div>

			<div class="flex-grow"></div>

			<div class="flex justify-between pt-8">
				<div class="w-1/3"></div>
				<button
					type="button"
					on:click={handleCancel}
					class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
					>CANCEL</button
				>
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>SAVE</button
				>
				<div class="w-1/3"></div>
			</div>
		</form>
	</div>
</div>
