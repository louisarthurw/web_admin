<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import { server, auth } from '$lib/store';
	import { get } from 'svelte/store';

	export let data;
	const company = data.company;

	const serverDetails = get(server);

	function setUser(arrayUsers) {
		if (arrayUsers === null) {
			return 'Tidak ada user';
		}
		let formattedUsers = '';
		arrayUsers.forEach((user, index) => {
			formattedUsers += `${index + 1}. ${user.username}\n`;
		});
		return formattedUsers;
	}

	const handleBack = () => {
		goto(`/user/manage/company`);
	};

	function getFileName(path) {
		return path.split('/').pop();
	}

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	let authValue = get(auth);
	let privilege_id = getPrivilegeIds(authValue.privileges);
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{company.nama}</h1>
	<form
		class="space-y-2"
		action="?/editCompany"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				await update({ reset: false });

				if (result.status === 200) {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil edit company!',
						text: result.data.message
					}).then(() => {
						goto('/user/manage/company');
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Gagal edit company!',
						text: result.data.message
					});
				}
			};
		}}
	>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyId">Company ID</label>
			<input
				name="companyId"
				value={company.id_perusahaan}
				type="text"
				placeholder="Company ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				name="username"
				value={company.username}
				type="text"
				placeholder="Username"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				name="location"
				value={company.lokasi}
				type="text"
				placeholder="Location"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				name="type"
				value={company.tipe}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="ownershipDocument">Ownership Document</label>
			<a
				href="http://{serverDetails.hostname}:{serverDetails.port}/file?path={company.dokumen_kepemilikan}"
				target="_blank"
			>
				<input
					name="ownershipDocument"
					value={getFileName(company.dokumen_kepemilikan)}
					type="text"
					placeholder="Ownership Document"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					required
					readonly
				/>
			</a>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyDocument">Company Document</label>
			<a
				href="http://leap.crossnet.co.id:1762/file?path={company.dokumen_perusahaan}"
				target="_blank"
			>
				<input
					name="companyDocument"
					value={getFileName(company.dokumen_perusahaan)}
					type="text"
					placeholder="Company Document"
					class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
					required
					readonly
				/>
			</a>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="initialCapital">Initial Capital</label>
			<input
				name="initialCapital"
				value={company.modal}
				type="number"
				min="0"
				placeholder="Initial Capital"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="description">Description</label>
			<input
				name="description"
				value={company.deskripsi}
				type="text"
				placeholder="Description"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="user">User</label>
			<textarea
				name="user"
				value={setUser(company.UserJoined)}
				type="text"
				placeholder="User"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				rows="4"
				required
				disabled
			/>
		</div>

		<div class="flex justify-between pt-8">
			<div class="w-1/3"></div>
			<button
				type="button"
				class="w-1/6 px-4 py-2 font-semibold text-[#18294E] bg-[#F3F4F6] border-2 border-[#18294E] rounded-md hover:bg-[#E2E6EA] transition duration-200"
				on:click={handleBack}
			>
				BACK
			</button>
			{#if privilege_id.includes(22)}
				<button
					type="submit"
					class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
					>SAVE
				</button>
			{/if}
			<div class="w-1/3"></div>
		</div>
	</form>
</div>
