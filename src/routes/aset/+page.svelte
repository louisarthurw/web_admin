<script>
	// @ts-nocheck

	import { user_id_login } from '../../stores';

	let user_id;

	$: {
		user_id_login.subscribe((value) => {
			user_id = value;
		});
	}
</script>

<div class="flex items-center justify-between p-3 bg-white border-b border-gray-300">
	<h1 class="text-3xl text-[#18294E] font-bold ml-8">Hello, user id {user_id}!</h1>
	<nav class="flex gap-24">
		<a href="/home" class="text-lg text-[#18294E] hover:underline">Home</a>
		<a href="/surveyor" class="text-lg text-[#18294E] hover:underline">Surveyor</a>
		<a href="/aset" class="text-lg text-[#18294E] font-bold hover:underline">Asset</a>
		<a href="/user" class="text-lg text-[#18294E] hover:underline">User</a>
	</nav>
	<div class="flex items-center mr-8">
		<img src="default_profile_icon.png" alt="User Icon" class="w-12 h-12 rounded-full" />
	</div>
</div>
