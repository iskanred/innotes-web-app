<script lang="ts">
	import { onMount } from "svelte";
	import { authStore } from "$lib/processes/auth/AuthStore";
	import { authPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import FoldersList from "$lib/pages/notes/ui/FoldersList.svelte";
	import NotesList from "$lib/pages/notes/ui/NotesList.svelte";
	import { Loader } from "@svelteuidev/core";
	import { getFolders } from "$lib/entities/folder/api/crud";
	import { getNotes } from "$lib/entities/notes/api/crud";
	import type { Folder } from "$lib/entities/folder/model/Folder";
	import type { Note } from "$lib/entities/notes/model/Note";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";

	onMount(() => {
		setTimeout(() => {
			if (!$authStore.loggedIn) {
				goto(authPagePath);
			} else {
				getFolders($authStore).then((dbFolders) => {
					folders = dbFolders;
				});
			}
		}, AUTH_LOADING_TIMEOUT_MS);
	});

	let currentFolderId: string;
	let folders: Folder[];
	let notes: Note[];

	$: if ($authStore.loggedIn && currentFolderId) {
		getNotes($authStore, currentFolderId).then((dbNotes) => {
			notes = dbNotes;
		});
	} else {
		notes = [];
	}
</script>

<main>
	{#if $authStore.loggedIn}
		<div id="folders">
			<FoldersList {folders} bind:currentFolderId />
		</div>
		<div id="notes">
			{#if currentFolderId}
				<NotesList {notes} {currentFolderId} />
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
