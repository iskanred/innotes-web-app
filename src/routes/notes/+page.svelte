<script lang="ts">
	import { onMount } from "svelte";
	import { authPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import FoldersList from "$lib/pages/notes/ui/FoldersList.svelte";
	import NotesList from "$lib/pages/notes/ui/NotesList.svelte";
	import { Loader, Text } from "@svelteuidev/core";
	import { getFolders } from "$lib/entities/folder/api/Crud";
	import { getNotes } from "$lib/entities/notes/api/Crud";
	import type { Folder } from "$lib/entities/folder/model/Folder";
	import type { Note } from "$lib/entities/notes/model/Note";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";
	import { sortedFolders } from "$lib/entities/folder/service/Extensions";
	import { authStore } from "$lib/shared/auth/AuthStore";

	let pageLoading = false;
	let foldersLoaded = false;
	let notesLoaded = false;

	let currentFolderId: string;
	let folders: Folder[];
	let notes: Note[];

	onMount(() => {
		setTimeout(() => {
			if (!$authStore.loggedIn) {
				goto(authPagePath);
			} else {
				getFolders($authStore).then((dbFolders: Folder[]) => {
					folders = sortedFolders(dbFolders);
					foldersLoaded = true;
					// select 1st folder as default
					if (dbFolders.length != 0 && dbFolders[0].id) {
						currentFolderId = dbFolders[0].id;
					}
				});
			}
		}, AUTH_LOADING_TIMEOUT_MS);
	});

	$: if ($authStore.loggedIn && currentFolderId) {
		getNotes($authStore, currentFolderId).then((dbNotes) => {
			notes = dbNotes;
			notesLoaded = true;
		});
	} else {
		notes = [];
	}
</script>

<main>
	{#if $authStore.loggedIn && !pageLoading}
		<div id="folders">
			{#if foldersLoaded}
				<FoldersList bind:folders bind:currentFolderId bind:pageLoading />
			{:else}
				<Loader size="xl" variant="dots" />
			{/if}
		</div>
		<div id="notes">
			{#if foldersLoaded && !currentFolderId}
				<Text size={32} align="center">Please, select a folder</Text>
			{:else if currentFolderId && !notesLoaded}
				<Loader size="xl" variant="dots" />
			{:else if currentFolderId && notesLoaded}
				<NotesList bind:notes bind:pageLoading {currentFolderId} />
			{/if}
		</div>
	{:else}
		<div id="loader">
			<Loader size="xl" variant="dots" />
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding-bottom: 20px;
	}
	#folders {
		width: 10%;
		max-width: 300px;
		flex: 1;
		padding: 20px 0 0;
		margin-right: 20px;
	}
	#notes {
		flex: 4;
		margin-right: 30px;
		margin-left: 30px;
		margin-top: 30px;
	}
	#loader {
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
