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
	import { onMount } from "svelte";
	import { setAuthStateHandler } from "$lib/processes/auth/AuthStateHandler";
	import { goto } from "$app/navigation";

	onMount(() => {
		setAuthStateHandler();
	});

	function handleAuthClick() {
		if ($authStore.loggedIn) {
			authHandlers.logout();
		}
		goto(authPagePath);
	}
</script>

<Header height="100%">
	<Paper shadow="sm">
		<nav>
			<HeaderButton href={homePagePath} text="Innotes" />
			<HeaderButton href={notesPagePath} text="My notes" />
			<HeaderButton href={aboutPagePath} text="About" />
			<Button on:click={handleAuthClick} size={54} variant="outline" ripple color="gray">
				<Text size={24} weight="bold" color="blue">
					{$authStore.loggedIn ? "Log out" : "Log in"}
				</Text>
			</Button>
		</nav>
	</Paper>
</Header>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		flex-flow: row wrap;
	}
</style>
