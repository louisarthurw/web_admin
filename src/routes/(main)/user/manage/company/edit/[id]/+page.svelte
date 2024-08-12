<script>
	// @ts-nocheck
	import Navbar4 from '$lib/components/Navbar4.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { companies } from '$lib/company';

	let name = '';
	let companyId = '';
	let username = '';
	let location = '';
	let type = '';
	let ownershipDocument = '';
	let companyDocument = '';
	let initialCapital = '';
	let description = '';
	let user = '';

	let id = $page.params.id;
	let company = companies.find((c) => c.id == id);

	if (company) {
		name = company.name;
		companyId = company.companyId;
		username = company.username;
		location = company.location;
		type = company.type;
		ownershipDocument = company.ownershipDocument;
		companyDocument = company.companyDocument;
		initialCapital = company.initialCapital;
		description = company.description;
		user = company.user;
	}

	const handleSave = () => {
		if (company) {
			company.name = name;
			company.companyId = companyId;
			company.username = username;
			company.location = location;
			company.type = type;
			company.ownershipDocument = ownershipDocument;
			company.companyDocument = companyDocument;
			company.initialCapital = initialCapital;
			company.description = description;
			goto('/user/manage/company');
		}
	};
</script>

<Navbar4 currentPage={$page.url.pathname}></Navbar4>

<div
	class="flex flex-col bg-[#F3F4F6] p-8 w-full space-y-6"
	style="min-height: calc(100vh - 117.6px);"
>
	<h1 class="text-3xl font-bold text-[#18294E]">{name}</h1>
	<form class="space-y-2" on:submit|preventDefault={handleSave}>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyId">Company ID</label>
			<input
				id="companyId"
				bind:value={companyId}
				type="text"
				placeholder="Company ID"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
				required
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
			<label class="text-[#18294E] font-semibold" for="location">Location</label>
			<input
				id="location"
				bind:value={location}
				type="text"
				placeholder="Location"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="type">Type</label>
			<input
				id="type"
				bind:value={type}
				type="text"
				placeholder="Type"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="ownershipDocument">Ownership Document</label>
			<input
				id="ownershipDocument"
				bind:value={ownershipDocument}
				type="text"
				placeholder="Ownership Document"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
		<div>
			<label class="text-[#18294E] font-semibold" for="companyDocument">Company Document</label>
			<input
				id="companyDocument"
				bind:value={companyDocument}
				type="text"
				placeholder="Company Document"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
        <div>
			<label class="text-[#18294E] font-semibold" for="initialCapital">Initial Capital</label>
			<input
				id="initialCapital"
				bind:value={initialCapital}
				type="text"
				placeholder="Initial Capital"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
        <div>
			<label class="text-[#18294E] font-semibold" for="description">Description</label>
			<input
				id="description"
				bind:value={description}
				type="text"
				placeholder="Description"
				class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#18294E] text-[#18294E] font-semibold"
                required
                />
		</div>
        <div>
			<label class="text-[#18294E] font-semibold" for="user">User</label>
			<textarea
				id="user"
				bind:value={user}
				type="text"
				placeholder="User"
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
