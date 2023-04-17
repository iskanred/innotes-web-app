<script lang="ts">
	import { base } from '$app/paths';
	import { Header, Paper } from '@svelteuidev/core';
	import HeaderAnchor from '$lib/pages/home/ui/HeaderAnchor.svelte';
</script>

<Header height="100%">
	<Paper shadow="sm">
		<nav>
			<HeaderAnchor href="{base}/" text="Innotes" />
			<HeaderAnchor href="{base}/notes/" text="My Notes" />
			<HeaderAnchor href="{base}/about/" text="About" />
			<HeaderAnchor href="{base}/auth/" text="Log in" />
		</nav>
	</Paper>
</Header>

<style>
	nav {
		display: flex;
		justify-content: space-around;
	}
</style>
