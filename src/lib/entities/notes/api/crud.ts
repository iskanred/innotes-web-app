import {
	DocumentReference,
	addDoc,
	collection,
	updateDoc,
	type DocumentData,
	doc,
	deleteDoc,
	getDocs,
	getDoc,
	QuerySnapshot,
	DocumentSnapshot
} from "firebase/firestore";
import { db } from "$lib/shared/FirebaseClient";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";
import type { Note } from "../model/Note";

export function addNote(
	$authStore: UserAuthState,
	title: string,
	content: string,
	folderId?: string
) {
	const newNote: Note = {
		title: title,
		content: content,
		folderId: folderId
	};
	return addDoc(
		collection(
			db,
			"users",
			$authStore.currentUser.uid as string,
			"folders",
			folderId as string,
			"notes"
		),
		newNote
	)
		.catch((error) => console.error("Error adding note: ", error))
		.then((note) => {
			const docRef = note as DocumentReference<DocumentData>;
			return updateDoc(docRef, { id: docRef.id }).then(() => getNoteByRef(docRef));
		});
}

export function getNotes($authStore: UserAuthState, folderId?: string) {
	return getDocs(
		collection(
			db,
			"users",
			$authStore.currentUser.uid as string,
			"folders",
			folderId as string,
			"notes"
		)
	)
		.catch((error) => console.error("Error getting notes: ", error))
		.then((notes) =>
			(notes as QuerySnapshot<DocumentData>).docs.map((noteSnap) => noteSnap.data() as Note)
		);
}

export function getNote($authStore: UserAuthState, folderId?: string, noteId?: string) {
	return getNoteByRef(getNodeDocRef($authStore, folderId as string, noteId as string));
}

export function getNoteByRef(noteDocRef: DocumentReference<DocumentData>) {
	return getDoc(noteDocRef)
		.catch((error) => console.error("Error getting note: ", error))
		.then((note) => (note as DocumentSnapshot<DocumentData>).data() as Note);
}

export function updateNote($authStore: UserAuthState, note: Note) {
	return updateDoc(getNodeDocRef($authStore, note.folderId as string, note.id as string), {
		...note
	}).catch((error) => console.error("Error updating note: ", error));
}

export function deleteNote($authStore: UserAuthState, folderId?: string, noteId?: string) {
	return deleteDoc(getNodeDocRef($authStore, folderId as string, noteId as string)).catch(
		(error) => console.error("Error deleting note: ", error)
	);
}

function getNodeDocRef($authStore: UserAuthState, folderId?: string, noteId?: string) {
	if (!folderId) {
		throw new Error("Folder id is required");
	}

	if (!noteId) {
		throw new Error("Note id is required");
	}

	return doc(
		db,
		"users",
		$authStore.currentUser.uid as string,
		"folders",
		folderId as string,
		"notes",
		noteId as string
	);
}
