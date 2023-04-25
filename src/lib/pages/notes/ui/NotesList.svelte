<script lang="ts">
	import { ActionIcon, Button, Card, Grid, Stack, Text } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";
	import NoteModal from "$lib/pages/note-modal/ui/NoteModal.svelte";
	import { deleteNote } from "$lib/entities/notes/api/Crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { Trash } from "radix-icons-svelte";

	const CONTENT_MAX_LENGTH = 70;

	const SPAN_SIZE = 4;

	export let notes: Note[] = [];
	export let currentFolderId: string;
	export let pageLoading = false;

	let selectedNote: Note | null = null;
	let shouldOpenModal = false;

	function stripContent(noteContent: string | null) {
		if (!noteContent) {
			return "";
		} else if (noteContent.length > CONTENT_MAX_LENGTH) {
			return noteContent.slice(0, CONTENT_MAX_LENGTH) + "...";
		} else {
			return noteContent;
		}
	}

	function handleOpenNote(note: Note | null = null) {
		selectedNote = note;
		shouldOpenModal = true;
	}

	function handleRemoveNote(note: Note) {
		pageLoading = true;
		deleteNote($authStore, note.folderId, note.id).then(() => {
			notes = notes.filter((n) => n.id !== note.id);
			pageLoading = false;
		});
	}
</script>

<Grid grow={false}>
	{#each notes as note}
		<Grid.Col span={SPAN_SIZE}>
			<Card shadow="xs" withBorder override={{ height: 190 }}>
				<Stack override={{ height: 160 }} justify="space-between">
					<ActionIcon
						on:click={() => {
							handleRemoveNote(note);
						}}
					>
						<Trash size={24} />
					</ActionIcon>
					<Text size={24} weight="bold" align="center">
						{note.title}
					</Text>
					<Text size={16}>
						{stripContent(note.content)}
					</Text>
					<Button
						on:click={() => handleOpenNote(note)}
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
	<Grid.Col span={SPAN_SIZE}>
		<Button
			override={{ height: 190 }}
			on:click={() => handleOpenNote()}
			ripple
			variant="outline"
			color="blue"
			fullSize
		>
			<Text size={32} align="center" color="blue">+ Note</Text>
		</Button>
	</Grid.Col>

	<NoteModal
		bind:opened={shouldOpenModal}
		bind:notes
		bind:selectedNote
		bind:pageLoading
		{currentFolderId}
	/>
</Grid>
