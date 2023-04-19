<script lang="ts">
	import { base } from "$app/paths";
	import { Header, Paper } from "@svelteuidev/core";
	import HeaderButton from "$lib/pages/home/ui/HeaderButton.svelte";
</script>

<Header height="100%">
	<Paper shadow="sm">
		<nav>
			<HeaderButton href="{base}/" text="Innotes" variant="subtle" textSize={48} />
			<HeaderButton href="{base}/notes/" text="My notes" variant="subtle" textSize={48} />
			<HeaderButton href="{base}/about/" text="About" variant="subtle" textSize={48} />
			<HeaderButton href="{base}/auth/" text="Log in" variant="outline" textSize={24} />
		</nav>
	</Paper>
</Header>

<style>
	nav {
		display: flex;
		justify-content: space-around;
	}
</style>
