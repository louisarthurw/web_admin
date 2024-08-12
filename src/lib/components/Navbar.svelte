<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
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

	export let nama_lengkap = 'ADMIN';
	export let foto_profil = 'default_profile_icon.png';
	export let email = 'admin@gmail.com';
	export let currentPage = '';

	const logout = () => {
		document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
		goto('/');
	};
</script>

<Navbar class="border-b border-gray-300 p-1 sticky left-0 top-0">
	<div class="self-center whitespace-nowrap text-3xl text-[#18294E] font-bold">
		Hello, {nama_lengkap}
	</div>

	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu" src={foto_profil} />
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm text-[#18294E]">{nama_lengkap}</span>
			<span class="block truncate text-sm text-[#18294E] font-medium">{email}</span>
		</DropdownHeader>
		<DropdownItem>Profile</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem on:click={logout}>Log Out</DropdownItem>
	</Dropdown>
	<NavUl>
		<NavLi
			href="/home"
			class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage === '/home' ? 'font-bold' : ''}`}
			>Home</NavLi
		>
		<NavLi
			href="/surveyor/assign"
			class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/surveyor') ? 'font-bold' : ''}`}
			>Surveyor</NavLi
		>
		<NavLi
			href="/aset/verif"
			class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/aset') ? 'font-bold' : ''}`}
			>Asset</NavLi
		>
		<NavLi
			href="/user/transaction"
			class={`text-lg text-[#18294E] hover:underline mx-4 ${currentPage.startsWith('/user') ? 'font-bold' : ''}`}
			>User</NavLi
		>
	</NavUl>
</Navbar>
