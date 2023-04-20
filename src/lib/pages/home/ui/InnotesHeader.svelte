<script lang="ts">
	import { Button, Header, Paper, Text } from "@svelteuidev/core";
	import HeaderButton from "$lib/pages/home/ui/HeaderButton.svelte";
	import {
		aboutPagePath,
		authPagePath,
		homePagePath,
		notesPagePath
	} from "$lib/shared/path/model/Paths.js";
	import { authHandlers, authStore } from "$lib/processes/auth/AuthStore";
	import { auth } from "$lib/processes/auth/FirebaseClient";
	import { onMount } from "svelte";

	let loggedIn = false;

	onMount(() => {
		return auth.onAuthStateChanged((user) => {
			loggedIn = !!user;
			authStore.update((current) => {
				return { ...current, isLoading: false, currentUser: user };
			});
		});
	});

	function handleAuthClick() {
		if (loggedIn) {
			authHandlers.logout();
		}
		window.location.href = authPagePath;
	}
</script>

<!--{#if $authStore.currentUser}-->
<!--    {$authStore.currentUser}-->
<!--    {loggedIn}-->
<Header height="100%">
	<Paper shadow="sm">
		<nav>
			<HeaderButton href={homePagePath} text="Innotes" />
			<HeaderButton href={notesPagePath} text="My notes" />
			<HeaderButton href={aboutPagePath} text="About" />
			<Button on:click={handleAuthClick} size={54} variant="outline" ripple color="gray">
				<Text size={24} weight="bold" color="blue">
					{loggedIn ? "Log out" : "Log in"}
				</Text>
			</Button>
		</nav>
	</Paper>
</Header>

<!--{:else}-->
<!--    {$authStore.currentUser}-->
<!--    {loggedIn}-->
<!--    Loading...-->
<!--{/if}-->

<style>
	nav {
		display: flex;
		justify-content: space-around;
		flex-flow: row wrap;
	}
</style>
