<script>
	// @ts-nocheck
	import Navbar2 from '$lib/components/Navbar2.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { surveyors } from '$lib/surveyors';

	let name = '';
	let workerId = '';
	let email = '';
	let phoneNumber = '';
	let username = '';
	let password = '';

	let surveyorId = $page.params.id;
	let surveyor = surveyors.find((s) => s.id == surveyorId);

	// let element = document.getElementById('navbar2');
	// console.log(element)
	// console.log(element.offsetHeight);

	if (surveyor) {
		name = surveyor.name;
		workerId = surveyor.workerId;
		email = surveyor.email;
		phoneNumber = surveyor.phoneNumber;
		username = surveyor.username;
		password = surveyor.password;
	}

	const handleSave = () => {
		if (surveyor) {
			surveyor.name = name;
			surveyor.workerId = workerId;
			surveyor.email = email;
			surveyor.phoneNumber = phoneNumber;
			surveyor.username = username;
			surveyor.password = password;
			goto('/surveyor/manage');
		}
	};
</script>

<Navbar2 currentPage={$page.url.pathname}></Navbar2>

<div class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6" style="height: calc(100vh - 117.6px);">
	<h1 class="text-3xl font-bold text-[#18294E]">{name}</h1>
	<form class="space-y-2" on:submit|preventDefault={handleSave}>
		<div>
			<label class="text-[#18294E] font-semibold" for="workerId">Worker ID</label>
			<input
				id="workerId"
				bind:value={workerId}
				type="text"
				placeholder="Worker ID"
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
