<script lang="ts">
	import { Button, Text, Title } from "@svelteuidev/core";
</script>

<main>
	<Title order={1} size={52} weight="extrabold">What is this?</Title>
	<Text size={32}>This service is a simple notes taking web application.</Text>
	<Button size="lg" ripple>Create your note</Button>
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
