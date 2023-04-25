<script>
	import { SvelteUIProvider } from "@svelteuidev/core";
	import InnotesHeader from "$lib/pages/home/ui/InnotesHeader.svelte";
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles>
	<div id="header">
		<InnotesHeader />
	</div>
	<slot />
</SvelteUIProvider>
