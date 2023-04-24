<script lang="ts">
	import { ActionIcon, Button, Card, Grid, Stack, Text } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";
	import NoteModal from "$lib/pages/note-modal/ui/NoteModal.svelte";
	import { addNote, deleteNote, updateNote } from "$lib/entities/notes/api/crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { Trash } from "radix-icons-svelte";

	const CONTENT_MAX_LENGTH = 70;

	const span = 4;

	export let notes: Note[] = [];
	export let currentFolderId: string;

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

		if (note) {
			updateNote($authStore, note);
		}
	}

	function createNewNote() {
		addNote($authStore, "New note", "", currentFolderId).then((note) => {
			notes.push(note);
			notes = notes;
			openNote(note);
		});
	}

	function handleRemoveNote(note: Note) {
		deleteNote($authStore, note.folderId, note.id).then(() => {
			notes = notes.filter((n) => n.id !== note.id);
		});
	}
</script>

<Grid grow={false}>
	{#each notes as note}
		<Grid.Col {span}>
			<Card shadow="xs" withBorder override={{ height: 190 }}>
				<Stack override={{ height: 160 }} justify="space-between">
					<ActionIcon
						on:click={() => {
							handleRemoveNote(note);
						}}
					>
						<Trash size={28} />
					</ActionIcon>
					<Text size={24} weight="bold" align="center">
						{note.title}
					</Text>
					<Text size={16}>
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
		<NoteModal note={selectedNote} onClosed={onNoteClosed} />
	{/if}
</Grid>
