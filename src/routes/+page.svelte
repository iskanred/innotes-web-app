<script lang="ts">
	import { ActionIcon, Anchor, Button, Group, Text, Title } from "@svelteuidev/core";
	import { GithubLogo } from "radix-icons-svelte";
	import { REPOSITORY_LINK } from "$lib/shared/constants/model/Constants.js";
	import { goto } from "$app/navigation";
	import { notesPagePath } from "$lib/shared/path/model/Paths.js";
</script>

<main>
	<Title order={1} size={52} weight="extrabold">What is this?</Title>
	<Text size={32}>This service is a simple notes taking web application.</Text>
	<Button size="lg" ripple on:click={() => goto(notesPagePath)}>Create your note</Button>
	<Group>
		<ActionIcon root="a" href={REPOSITORY_LINK}>
			<GithubLogo size={106} />
		</ActionIcon>
		<Anchor root="a" href={REPOSITORY_LINK}>GitHub Repository</Anchor>
	</Group>
</main>

<style>
	main {
		height: 80vh;
		width: 100%;

		gap: 72px;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
</style>
