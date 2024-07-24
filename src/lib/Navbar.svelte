<script>
	export let nama_lengkap = 'ADMIN';
	export let foto_profil = 'default_profile_icon.png'
</script>

<div class="flex items-center justify-between p-3 bg-white border-b border-gray-300">
	<h1 class="text-3xl text-[#18294E] font-bold ml-8">Hello, {nama_lengkap}!</h1>
	<nav class="flex gap-24">
		<slot />
	</nav>
	<div class="flex items-center mr-8">
		<img src={foto_profil} alt="User Icon" class="w-12 h-12 rounded-full border-2 border-[#18294E]" />
	</div>
</div>
