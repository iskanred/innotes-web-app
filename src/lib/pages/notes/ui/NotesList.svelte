<script lang="ts">
	import { Button, Grid, Stack, Text } from "@svelteuidev/core";
	import { Card } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";

	const CONTENT_MAX_LENGTH = 70;

	const span = 4;

	export let notes: Note[] = [];

	function stripContent(noteContent: string) {
		if (noteContent.length > CONTENT_MAX_LENGTH) {
			return noteContent.slice(0, CONTENT_MAX_LENGTH) + "...";
		}
		return noteContent;
	}
</script>

<Grid grow={false}>
	{#each notes as note}
		<Grid.Col {span}>
			<Card shadow="xs" withBorder override={{ height: 190 }}>
				<Stack override={{ height: 160 }} justify="space-between">
					<Text size={32} weight="bold" align="center">
						{note.title}
					</Text>
					<Text size={20}>
						{stripContent(note.content)}
					</Text>
					<Button ripple variant="light" color="blue" fullSize>Open</Button>
				</Stack>
			</Card>
		</Grid.Col>
	{/each}
	<Grid.Col {span}>
		<Button override={{ height: 200 }} ripple variant="light" color="blue" fullSize>
			<Text size={32} align="center" weight="bold">+ Note</Text>
		</Button>
	</Grid.Col>
</Grid>
