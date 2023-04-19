<script lang="ts">
	import type { ButtonVariant } from "@svelteuidev/core";
	import { Button, Text } from "@svelteuidev/core";

	export let href: string;
	export let text: string;
	export let variant: ButtonVariant;
	export let textSize: number;
</script>

<Button {href} size={54} {variant} ripple color="gray">
	<Text size={textSize} weight="bold" color="blue">
		{text}
	</Text>
</Button>
