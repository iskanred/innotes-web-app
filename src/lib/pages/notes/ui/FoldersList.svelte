<script lang="ts">
	import { ActionIcon, Button, Divider, Group, Text } from "@svelteuidev/core";
	import { Pencil1, Trash } from "radix-icons-svelte";
	import { deleteFolder } from "$lib/entities/folder/api/Crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import type { Folder } from "$lib/entities/folder/model/Folder";
	import { sortedFolders } from "$lib/entities/folder/service/Extensions.js";
	import FolderModal from "$lib/pages/notes/ui/FolderModal.svelte";

	export let folders: Folder[] = [];
	export let currentFolderId: string | undefined;
	export let selectedFolder: Folder | null = null;
	export let pageLoading = false;

	let shouldOpenModal = false;

	function handleOpenModal(folder: Folder | null = null) {
		selectedFolder = folder;
		shouldOpenModal = true;
	}

	function handleRemoveFolder(folderId?: string) {
		pageLoading = true;
		deleteFolder($authStore, folderId).then(() => {
			folders = sortedFolders(folders.filter((folder) => folder.id != folderId));
			currentFolderId = (folders && folders.length) > 0 ? folders[0].id : undefined;
			pageLoading = false;
		});
	}
</script>

<div id="main-content">
	{#each folders as folder}
		<Group spacing="xs">
			<ActionIcon
				on:click={() => handleRemoveFolder(folder.id)}
				override={{
					marginLeft: 10
				}}
			>
				<Trash size={28} />
			</ActionIcon>
			<ActionIcon on:click={() => handleOpenModal(folder)}>
				<Pencil1 size={24} />
			</ActionIcon>
		</Group>
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
		on:click={() => handleOpenModal()}
		override={{
			marginLeft: 20
		}}
	>
		<Text size={24} color="blue">+ Folder</Text>
	</Button>
	<FolderModal
		bind:selectedFolder
		bind:currentFolderId
		bind:opened={shouldOpenModal}
		bind:folders
		bind:pageLoading
	/>
</div>

<style>
	#main-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
