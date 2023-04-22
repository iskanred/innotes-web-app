<script lang="ts">
	import { ActionIcon, Button, Divider, Modal, Text, TextInput } from "@svelteuidev/core";
	import { Folder } from "$lib/entities/folder/model/Folder";
	import { Trash } from "radix-icons-svelte";

	const FOLDER_NAME_MAX_LENGTH = 15;

	export let folders: Folder[] = [];
	export let currentFolderId = "";

	let newFolderAdding = false;
	let newFolderName = "";
	let validationErrorText = "";

	function validateFolderName(): boolean {
		if (!newFolderName) {
			validationErrorText = "Folder name is required!";
			return false;
		}
		if (newFolderName.length > FOLDER_NAME_MAX_LENGTH) {
			validationErrorText = `Folder name must no more than ${FOLDER_NAME_MAX_LENGTH} characters long!`;
			return false;
		}
		return true;
	}

	function handleAddNewFolder() {
		if (validateFolderName()) {
			// here we need to create a new folder in firestore
			folders.push(new Folder("dummy", newFolderName));
			folders = folders;
			newFolderAdding = false;
			newFolderName = "";
			return;
		}
	}

	function handleRemoveFolder(folderId: string) {
		// here we need to remove the folder from firestore
		folders = folders.filter((folder) => folder.id != folderId);
	}
</script>

<div id="main-content">
	{#each folders as folder}
		<ActionIcon
			on:click={() => {
				handleRemoveFolder(folder.id);
			}}
		>
			<Trash size={28} />
		</ActionIcon>
		<Button
			size={60}
			variant="subtle"
			color="gray"
			on:click={() => {
				currentFolderId = folder.id;
			}}
			ripple
		>
			<Text size={32} align="center" weight="bold">
				{folder.name}
			</Text>
		</Button>
		<Divider />
	{/each}
	<Button
		variant="subtle"
		ripple
		on:click={() => {
			newFolderAdding = true;
		}}
	>
		<Text size={24} color="blue">+ Folder</Text>
	</Button>
	{#if newFolderAdding}
		<Modal
			centered
			opened={newFolderAdding}
			on:close={() => {
				newFolderAdding = false;
				validationErrorText = "";
			}}
			withCloseButton
			size="lg"
		>
			<div id="modal">
				<Text size={24}>Type new folder name</Text>
				<TextInput
					on:click={() => {
						validationErrorText = "";
					}}
					bind:value={newFolderName}
					error={validationErrorText}
					required
				/>
				<Button on:click={handleAddNewFolder}>Apply</Button>
			</div>
		</Modal>
	{/if}
</div>

<style>
	#main-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	#modal {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
