<script lang="ts">
	import { Anchor } from '@svelteuidev/core';

	export let href: string;

	export let text: string;
</script>

<div class="anchor">
	<Anchor {href} size={48} weight={'bold'} underline={false}>
		{text}
	</Anchor>
</div>

<style>
	div.anchor:hover {
		background-color: #faf7f7;
	}
	div.anchor {
		padding: 0 48px;
	}
</style>
