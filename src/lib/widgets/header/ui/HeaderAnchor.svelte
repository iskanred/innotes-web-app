<script lang="ts">
	import { Anchor } from '@svelteuidev/core';

	export let href: string;

	export let text: string;
</script>

<Anchor size={48} weight={'bold'} {href} underline={false}>
	{text}
</Anchor>
