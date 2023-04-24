<script lang="ts">
	import { Modal, Button, Group } from "@svelteuidev/core";
	import type { Note } from "$lib/entities/notes/model/Note";

	export let note: Note;
	export let onClosed: (arg0: Note | null) => void;

	let isOpened = true;

	function handleClose(save = false) {
		onClosed(save ? note : null);
		isOpened = false;
	}
</script>

<Modal centered opened={isOpened} withCloseButton={false} size="xl">
	<section class="note-container">
		<input bind:value={note.title} class="note-title editable-field" />
		<textarea bind:value={note.content} class="note-content editable-field" rows="40" />
	</section>

	<Group position="right">
		<!-- TODO: add input discard on cancel -->
		<Button on:click={() => handleClose()} variant="outline" size="md">Cancel</Button>
		<Button on:click={() => handleClose(true)} variant="filled" color="green" size="md"
			>Save</Button
		>
	</Group>
</Modal>

<style>
	.note-title {
		font-size: 2rem;
		width: 23em;
	}

	.note-content {
		width: 46em;
		height: 30em;
	}

	.editable-field {
		outline: none;
		border-radius: 0.2em;
		resize: none;
		padding: 0.25em;
		margin-bottom: 0.5em;
		box-sizing: border-box;
	}

	.editable-field:focus {
		outline: none;
	}
</style>
