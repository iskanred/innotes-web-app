<script lang="ts">
	import { Button, Text } from '@svelteuidev/core';
</script>

<div id="content">
	<Text size={52} weight="extrabold">What is this?</Text>
	<Text size={32}>This service is a simple notes taking web application.</Text>
	<Button size="lg" ripple>Create your note</Button>
</div>

<style>
	#content {
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
