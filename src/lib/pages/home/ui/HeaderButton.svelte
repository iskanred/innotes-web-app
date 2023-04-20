<script lang="ts">
	import { Button, Text } from "@svelteuidev/core";

	export let href: string;
	export let text: string;
</script>

<Button {href} size={54} variant="subtle" ripple color="gray">
	<Text size={48} weight="bold" color="blue">
		{text}
	</Text>
</Button>
