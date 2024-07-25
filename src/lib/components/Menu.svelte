<script>
	export let title = 'Menu';
	export let href = '/';
	export let active = false; 
</script>

<a {href} class={`text-lg text-[#18294E] hover:underline ${active ? 'font-bold' : ''}`}>{title}</a>
