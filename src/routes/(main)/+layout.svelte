<script>
	// @ts-nocheck
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { server } from '$lib/store';
	import { get } from 'svelte/store';

	const serverDetails = get(server);

	let userInfo = {
		nama_lengkap: 'ADMIN',
		foto_profil: 'default_profile_icon.png',
		email: 'adminn@gmail.com'
	};
	let isDataFetched = false;
	let currentPage = '';

	async function fetchUserInfo() {
		const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
			const [name, value] = cookie.split('=');
			acc[name] = value;
			return acc;
		}, {});

		if (cookies.auth) {
			userInfo = JSON.parse(decodeURIComponent(cookies.auth));
		}
		isDataFetched = true;
	}

	onMount(() => {
		fetchUserInfo();
		console.log(userInfo);
	});
</script>

{#if isDataFetched}
	<Navbar
		nama_lengkap={userInfo.nama_lengkap}
		foto_profil={userInfo.foto_profil === '' ? '/default_profile_icon.png' : `http://${serverDetails.hostname}:${serverDetails.port}/file?path=${userInfo.foto_profil}`}
		email={userInfo.email}
		currentPage={$page.url.pathname}
	></Navbar>
	<slot />
{/if}
