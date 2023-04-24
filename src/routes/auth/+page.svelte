<script lang="ts">
	import AuthForm from "$lib/pages/auth/ui/AuthForm.svelte";
	import { onMount } from "svelte";
	import { authStore } from "$lib/processes/auth/AuthStore";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";
	import { Loader } from "@svelteuidev/core";
	import { goto } from "$app/navigation";
	import { notesPagePath } from "$lib/shared/path/model/Paths.js";

	let isAuthLoading = true;

	onMount(() => {
		setTimeout(() => {
			isAuthLoading = false;
		}, AUTH_LOADING_TIMEOUT_MS);
	});
</script>

<main>
	{#if isAuthLoading && !$authStore.loggedIn}
		<Loader size="xl" variant="dots" />
	{:else if $authStore.loggedIn}
		<div style="display: none">
			{goto(notesPagePath)}
		</div>
	{:else}
		<AuthForm />
	{/if}
</main>

<style>
	main {
		height: 70vh;
		width: 100%;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
</style>
