<script>
	// @ts-nocheck

	import Menu from '$lib/components/Menu.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let userInfo = { nama_lengkap: 'ADMIN', foto_profil: 'default_profile_icon.png' };

	onMount(() => {
		const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
			const [name, value] = cookie.split('=');
			acc[name] = value;
			return acc;
		}, {});

		if (cookies.auth) {
			userInfo = JSON.parse(decodeURIComponent(cookies.auth));
			// console.log("user info: ", userInfo);
		}
	});
</script>

<Navbar nama_lengkap={userInfo.nama_lengkap} foto_profil={userInfo.foto_profil}>
	<Menu title="Home" href="/home" active={$page.url.pathname === '/home'}></Menu>
	<Menu title="Surveyor" href="/surveyor" active={$page.url.pathname === '/surveyor'}></Menu>
	<Menu title="Asset" href="/aset" active={$page.url.pathname === '/aset'}></Menu>
	<Menu title="User" href="/user" active={$page.url.pathname === '/user'}></Menu>
</Navbar>

<slot />

<!-- <div class="p-4">
</div> -->
