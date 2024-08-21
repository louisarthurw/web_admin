<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { users } from '$lib/user';

	let name = '';
	let userId = '';
	let username = '';
	let password = '';
	let email = '';
	let phoneNumber = '';
	let company = '';

	let id = $page.params.id;
	let user = users.find((u) => u.id == id);

	if (user) {
		name = user.name;
		userId = user.userId;
		username = user.username;
		password = user.password;
		email = user.email;
		phoneNumber = user.phoneNumber;
        company = user.company
	}

	const handleSave = () => {
		if (user) {
			user.name = name;
            user.userId = userId;
            user.username = username;
            user.password = password;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.company = company
			goto('/user/manage');
		}
	};
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6" style="min-height: calc(100vh - 117.6px);">
	<h1 class="text-3xl font-bold text-[#18294E]">{name}</h1>
	<form class="space-y-2" on:submit|preventDefault={handleSave}>
		<div>
			<label class="text-[#18294E] font-semibold" for="userId">User ID</label>
			<input
				id="userId"
				bind:value={userId}
				type="text"
				placeholder="User ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				disabled
			/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="username">Username</label>
			<input
				id="username"
				bind:value={username}
				type="text"
				placeholder="Username"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
				/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="password">Password</label>
			<input
				id="password"
				bind:value={password}
				type="password"
				placeholder="Password"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
				/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="email">Email</label>
			<input
				id="email"
				bind:value={email}
				type="email"
				placeholder="Email"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
				/>
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="phoneNumber">Phone Number</label>
			<input
				id="phoneNumber"
				bind:value={phoneNumber}
				type="tel"
				placeholder="Phone Number"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
				/>
		</div>
        <div>
			<label class="text-[#18294E] font-semibold" for="company">Company</label>
			<textarea
				id="company"
				bind:value={company}
				type="text"
				placeholder="Company"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                rows="4"
				required
                />
		</div>
		<div class="flex justify-between pt-8">
			<div class="w-5/12"></div>
			<button
				type="submit"
				class="w-1/6 px-4 py-2 font-semibold text-white bg-[#18294E] rounded-md hover:bg-[#152140] transition duration-200 ml-4"
				>SAVE</button
			>
			<div class="w-5/12"></div>
		</div>
	</form>
</div>
