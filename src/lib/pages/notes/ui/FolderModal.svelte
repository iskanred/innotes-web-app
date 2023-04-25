<script lang="ts">
	import { Button, Modal, Text, TextInput } from "@svelteuidev/core";
	import type { Folder } from "$lib/entities/folder/model/Folder";
	import { validateFolderName } from "$lib/entities/folder/service/Validation";
	import { addFolder, updateFolder } from "$lib/entities/folder/api/Crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { sortedFolders } from "$lib/entities/folder/service/Extensions";

	export let selectedFolder: Folder | null;
	export let currentFolderId: string | undefined;
	export let opened: boolean;
	export let folders: Folder[];
	export let pageLoading = false;

	let folderName: string | null = null;
	let validationErrorText = "";

	$: if (folderName == null && selectedFolder) {
		folderName = selectedFolder.name;
	}

	function handleClose(save = false) {
		if (save) {
			validationErrorText = validateFolderName(folderName);
			if (validationErrorText == "") {
				opened = false;
				saveFolder();
			}
		} else {
			opened = false;
			clearFields();
		}
	}

	function saveFolder() {
		pageLoading = true;
		if (selectedFolder) {
			// update existing
			selectedFolder.name = folderName as string;
			const selectedFolderCopy = selectedFolder;

			updateFolder($authStore, selectedFolder).then(() => {
				const newFolders = folders.filter((n) => n.id !== selectedFolderCopy.id);
				newFolders.push(selectedFolderCopy);
				folders = sortedFolders(newFolders);
				pageLoading = false;
			});

			selectedFolder = null;
			clearFields();
		} else {
			// create new folder
			addFolder($authStore, folderName as string).then((folder) => {
				folders.push(folder);
				folders = sortedFolders(folders);
				currentFolderId = folder.id as string;
				pageLoading = false;
			});
		}
	}

	function clearFields() {
		validationErrorText = "";
		folderName = "";
	}
</script>

<Modal
	centered
	opened={!pageLoading && opened}
	withCloseButton
	on:close={() => {
		handleClose();
	}}
	size="lg"
>
	<div id="modal">
		<Text size={24}>Type new folder name</Text>
		<TextInput
			bind:value={folderName}
			on:click={() => {
				validationErrorText = "";
			}}
			error={validationErrorText}
			required
		/>
		<Button on:click={() => handleClose(true)}>Apply</Button>
	</div>
</Modal>

<style>
	#modal {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
