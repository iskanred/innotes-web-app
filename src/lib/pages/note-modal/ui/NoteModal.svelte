<script lang="ts">
	import { Modal, Button, Group, TextInput } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";
	import { addNote, updateNote } from "$lib/entities/notes/api/Crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { validateNoteName } from "$lib/entities/notes/service/Validation";

	export let selectedNote: Note | null;
	export let opened: boolean;
	export let currentFolderId: string;
	export let notes: Note[];
	export let pageLoading = false;

	let validationErrorText = "";

	let noteTitle: string | null = null;
	let noteContent = "";

	$: if (noteTitle == null && selectedNote) {
		noteTitle = selectedNote.title;
		noteContent = selectedNote.content;
	}

	function handleClose(save = false) {
		if (save) {
			validationErrorText = validateNoteName(noteTitle);
			if (validationErrorText == "") {
				opened = false;
				saveNote();
			}
		} else {
			opened = false;
			clearFields();
		}
	}

	function saveNote() {
		pageLoading = true;
		if (selectedNote) {
			// update existing
			selectedNote.title = noteTitle as string;
			selectedNote.content = noteContent;
			const selectedNoteCopy = selectedNote;

			updateNote($authStore, selectedNote).then(() => {
				const newNotes = notes.filter((n) => n.id !== selectedNoteCopy.id);
				newNotes.push(selectedNoteCopy);
				notes = newNotes;
				pageLoading = false;
			});

			selectedNote = null;
			clearFields();
		} else {
			// create new note
			addNote($authStore, noteTitle as string, noteContent, currentFolderId).then((note) => {
				notes.push(note);
				notes = notes;
				pageLoading = false;
			});
		}
	}

	function clearFields() {
		validationErrorText = "";
		noteTitle = null;
		noteContent = "";
	}
</script>

<Modal
	centered
	opened={!pageLoading && opened}
	withCloseButton
	on:close={() => handleClose()}
	size="xl"
>
	<section class="note-container">
		<div class="note-title">
			<TextInput
				bind:value={noteTitle}
				on:click={() => {
					validationErrorText = "";
				}}
				error={validationErrorText}
				required
			/>
		</div>
		<textarea bind:value={noteContent} class="note-content editable-field" rows="40" />
	</section>

	<Group position="right">
		<Button on:click={() => handleClose(true)} variant="filled" color="green" size="md" ripple>
			Save
		</Button>
	</Group>
</Modal>

<style>
	.note-title {
		font-size: 2rem;
		width: 23em;
		margin-bottom: 0.5em;
	}

	.note-content {
		width: 46em;
		height: 30em;
		outline: none;
		border-radius: 0.2em;
		resize: none;
		padding: 0.25em;
		margin-bottom: 0.5em;
		box-sizing: border-box;
		border-color: #ced4da;
	}

	.note-content:focus {
		outline: none;
		border-color: #4dabf7;
	}
</style>
