<script lang="ts">
	import { ActionIcon, Button, Divider, Modal, Text, TextInput } from "@svelteuidev/core";
	import { Trash } from "radix-icons-svelte";
	import { addFolder, deleteFolder } from "$lib/entities/folder/api/crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import type { Folder } from "$lib/entities/folder/model/Folder";

	const FOLDER_NAME_MAX_LENGTH = 15;

	export let folders: Folder[] = [];
	export let currentFolderId: string | undefined;

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
			addFolder($authStore, newFolderName).then((folder) => {
				folders.push(folder);
				folders = folders;
				newFolderAdding = false;
				newFolderName = "";
			});
			return;
		}
	}

	function handleRemoveFolder(folderId?: string) {
		deleteFolder($authStore, folderId).then(() => {
			folders = folders.filter((folder) => folder.id != folderId);
		});
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
