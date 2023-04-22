<script lang="ts">
	import { onMount } from "svelte";
	import { authStore } from "$lib/processes/auth/AuthStore";
	import { authPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import FoldersList from "$lib/pages/notes/ui/FoldersList.svelte";
	import { Folder } from "$lib/entities/folder/model/Folder";
	import NotesList from "$lib/pages/notes/ui/NotesList.svelte";
	import { Note } from "$lib/entities/notes/model/Note";

	onMount(() => {
		setTimeout(() => {
			if (!$authStore.loggedIn) {
				goto(authPagePath);
			}
		}, 1000);
	});

	// id of default folder
	let currentFolderId = "id1";

	let folders = [
		new Folder("id1", "Default"),
		new Folder("id2", "Home"),
		new Folder("id3", "Study"),
		new Folder("id4", "Work")
	];

	function getNotesByFolderId() {
		// go to firestore and get all notes by folder id
		if (currentFolderId == "id1") {
			return [
				new Note(
					"id1",
					"Clean",
					"Wash dish Lalalf rfejrifjwerjfweorijfweoirjfoweirjfowerjf rwfjerjf werjf wererfwer wfer",
					currentFolderId
				),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId),
				new Note("id1", "Clean", "Wash dish", currentFolderId)
			];
		}
		return [];
	}
</script>

<main>
	<div id="folders">
		<FoldersList {folders} bind:currentFolderId />
	</div>
	<div id="notes">
		<NotesList notes={currentFolderId ? getNotesByFolderId() : []} />
	</div>
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
</style>
