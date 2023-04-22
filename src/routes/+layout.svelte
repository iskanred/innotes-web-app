<script>
	import { SvelteUIProvider } from "@svelteuidev/core";
	import InnotesHeader from "$lib/pages/home/ui/InnotesHeader.svelte";

	let isDark = false;
	function toggleTheme() {
		isDark = !isDark;
	}
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={isDark ? "dark" : "light"}>
	<div id="header">
		<InnotesHeader />
	</div>
	<!--    <Stack align='center'>-->
	<!--&lt;!&ndash;        <Switch on:change={toggleTheme} />&ndash;&gt;-->
	<!--    </Stack>-->
	<slot />
</SvelteUIProvider>
