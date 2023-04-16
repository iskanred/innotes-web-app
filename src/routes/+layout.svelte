<script>
	import { SvelteUIProvider } from '@svelteuidev/core';
	import InnotesHeader from '$lib/widgets/header/ui/InnotesHeader.svelte';

	let isDark = false;
	function toggleTheme() {
		isDark = !isDark;
	}
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver={isDark ? 'dark' : 'light'}>
	<InnotesHeader />
	<!--    <Stack align='center'>-->
	<!--&lt;!&ndash;        <Switch on:change={toggleTheme} />&ndash;&gt;-->
	<!--    </Stack>-->
	<slot />
</SvelteUIProvider>
