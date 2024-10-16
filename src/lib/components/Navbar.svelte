<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth } from '$lib/store';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';
	import { get } from 'svelte/store';

	export let nama_lengkap = 'ADMIN';
	export let foto_profil = 'default_profile_icon.png';
	export let email = 'admin@gmail.com';
	export let currentPage = '';
	export let privileges = '';

	let urlSurveyor = '';
	let urlAsset = '';
	let urlUser = '';

	const logout = () => {
		document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
		goto('/');
	};

	function getPrivilegeIds(data) {
		return data.map((item) => item.privilege_id);
	}

	privileges = getPrivilegeIds(privileges);

	function getURLSurveyor() {
		if (privileges.includes(2)) {
			urlSurveyor = '/surveyor/assign';
		} else if (privileges.includes(3)) {
			urlSurveyor = '/surveyor/manage';
		} else if (privileges.includes(6)) {
			urlSurveyor = '/surveyor/tasklist';
		}
	}

	function getURLAsset() {
		if (privileges.includes(8)) {
			urlAsset = '/aset/verif';
		} else if (privileges.includes(1)) {
			urlAsset = '/aset/manage';
		}
	}

	function getURLUser() {
		if (privileges.includes(15)) {
			urlUser = '/user/transaction';
		} else if (privileges.includes(17)) {
			urlUser = '/user/verif';
		} else if (privileges.includes(19) || privileges.includes(20)) {
			urlUser = '/user/manage';
		}
	}

	getURLSurveyor();
	getURLAsset();
	getURLUser();
</script>

<Navbar class="border-b border-gray-300 p-1 sticky left-0 top-0 z-10">
	<div class="self-center whitespace-nowrap text-3xl text-[#18294E] font-bold">
		Hello, {nama_lengkap}
	</div>

	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu" src={foto_profil} class="border-2 border-gray-300 rounded-full" />
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm text-[#18294E]">{nama_lengkap}</span>
			<span class="block truncate text-sm text-[#18294E] font-medium">{email}</span>
		</DropdownHeader>
		<DropdownItem href="/profile">Profile</DropdownItem>
		{#if privileges.includes(24) || privileges.includes(25) || privileges.includes(26)}
			<DropdownItem href="/settings">Settings</DropdownItem>
		{/if}
		<DropdownItem on:click={logout}>Log Out</DropdownItem>
	</Dropdown>
	<NavUl>
		<NavLi
			href="/home"
			class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage === '/home' ? 'font-bold' : ''}`}
			>Home</NavLi
		>

		<!-- assign surveyor / lihat data surveyor -->
		{#if privileges.includes(2) || privileges.includes(3)}
			<NavLi
				href={urlSurveyor}
				class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/surveyor') ? 'font-bold' : ''}`}
				>Surveyor</NavLi
			>
		{/if}
		<!-- lihat data asset / verifikasi survey request -->
		{#if privileges.includes(1) || privileges.includes(8)}
			<NavLi
				href={urlAsset}
				class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/aset') ? 'font-bold' : ''}`}
				>Asset</NavLi
			>
		{/if}
		<!-- lihat data transaction request / lihat data verification request / lihat data user / lihat data perusahaan -->
		{#if privileges.includes(15) || privileges.includes(17) || privileges.includes(19) || privileges.includes(20)}
			<NavLi
				href={urlUser}
				class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/user') ? 'font-bold' : ''}`}
				>User</NavLi
			>
		{/if}
	</NavUl>
</Navbar>
