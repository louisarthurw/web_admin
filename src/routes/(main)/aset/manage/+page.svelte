<script>
	// @ts-nocheck
	import Navbar3 from "$lib/components/Navbar3.svelte";
	import { page } from '$app/stores';

</script>

<Navbar3 currentPage={$page.url.pathname}></Navbar3>
