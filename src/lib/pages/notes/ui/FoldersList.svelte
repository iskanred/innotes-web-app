<script lang="ts">
	import { ActionIcon, Button, Divider, Modal, Text, TextInput } from "@svelteuidev/core";
	import { Trash } from "radix-icons-svelte";
	import { addFolder, deleteFolder } from "$lib/entities/folder/api/Crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import type { Folder } from "$lib/entities/folder/model/Folder";
	import { sortedFolders } from "$lib/entities/folder/service/Extensions.js";
	import { validateFolderName } from "$lib/entities/folder/service/Validation";

	export let folders: Folder[] = [];
	export let currentFolderId: string | undefined;
	export let pageLoading = false;

	let newFolderAdding = false;
	let newFolderName = "";
	let validationErrorText = "";

	function handleAddNewFolder() {
		let validationErrorText = validateFolderName(newFolderName);
		if (validationErrorText == "") {
			pageLoading = true;
			addFolder($authStore, newFolderName).then((folder) => {
				folders.push(folder);
				folders = sortedFolders(folders);
				currentFolderId = folder.id;
				newFolderAdding = false;
				newFolderName = "";
				pageLoading = false;
			});
		}
	}

	function handleRemoveFolder(folderId?: string) {
		pageLoading = true;
		deleteFolder($authStore, folderId).then(() => {
			folders = sortedFolders(folders.filter((folder) => folder.id != folderId));
			currentFolderId = folders && folders.length > 0 ? folders[0].id : undefined;
			pageLoading = false;
		});
	}
</script>

<div id="main-content">
	{#each folders as folder}
		<ActionIcon
			on:click={() => {
				handleRemoveFolder(folder.id);
			}}
			override={{
				marginLeft: 10
			}}
		>
			<Trash size={28} />
		</ActionIcon>
		<Button
			size={60}
			variant="subtle"
			color="gray"
			disabled={folder.id === currentFolderId}
			on:click={() => {
				currentFolderId = folder.id;
			}}
			ripple
			override={{
				marginLeft: 20
			}}
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
		override={{
			marginLeft: 20
		}}
	>
		<Text size={24} color="blue">+ Folder</Text>
	</Button>
	{#if newFolderAdding}
		<Modal
			centered
			opened={!pageLoading && newFolderAdding}
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
					bind:value={newFolderName}
					on:click={() => {
						validationErrorText = "";
					}}
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
