<script lang="ts">
	import { Button, Card, Grid, Stack, Text } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";
	import SingleNoteContent from "$lib/pages/single-note/ui/SingleNoteContent.svelte";

	const CONTENT_MAX_LENGTH = 70;

	const span = 4;

	export let notes: Note[] = [];

	let selectedNote: Note;
	let shouldOpenNote = false;

	function stripContent(noteContent: string) {
		if (noteContent.length > CONTENT_MAX_LENGTH) {
			return noteContent.slice(0, CONTENT_MAX_LENGTH) + "...";
		}
		return noteContent;
	}

	function openNote(note: Note) {
		selectedNote = note;
		shouldOpenNote = true;
	}

	function onNoteClosed(note: Note | null) {
		shouldOpenNote = false;

		// TODO: сохранить изменения данных в базе, здесб приходит уже новый ноут или null, если надо его удалить
		// TODO: id и folderId можно найти в selectedNote
	}

	function createNewNote() {
		// TODO: дать новый id и folderId
		let newNote: Note = {
			id: "-1",
			title: "New note",
			content: "",
			folderId: "-1"
		};

		// TODO: добавить новую запись и рефрешнуть страницу
		notes.push(newNote);

		openNote(newNote);
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
					<Button
						on:click={() => {
							openNote(note);
						}}
						ripple
						variant="light"
						color="blue"
						fullSize
					>
						Open
					</Button>
				</Stack>
			</Card>
		</Grid.Col>
	{/each}
	<Grid.Col {span}>
		<Button
			override={{ height: 190 }}
			on:click={() => {
				createNewNote();
			}}
			ripple
			variant="outline"
			color="blue"
			fullSize
		>
			<Text size={32} align="center" color="blue">+ Note</Text>
		</Button>
	</Grid.Col>

	{#if shouldOpenNote}
		<SingleNoteContent note={selectedNote} onClosed={onNoteClosed} />
	{/if}
</Grid>
