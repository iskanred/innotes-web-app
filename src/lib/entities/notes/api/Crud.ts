import {
	DocumentReference,
	addDoc,
	collection,
	updateDoc,
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
): Promise<Note> {
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
			const docRef = note as DocumentReference;
			return updateDoc(docRef, { id: docRef.id }).then(() => getNoteByRef(docRef));
		});
}

export function getNotes($authStore: UserAuthState, folderId?: string): Promise<Note[]> {
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
		.then((notes) => (notes as QuerySnapshot).docs.map((noteSnap) => noteSnap.data() as Note));
}

export function getNoteByRef(noteDocRef: DocumentReference): Promise<Note> {
	return getDoc(noteDocRef)
		.catch((error) => console.error("Error getting note: ", error))
		.then((note) => (note as DocumentSnapshot).data() as Note);
}

export function updateNote($authStore: UserAuthState, note: Note): Promise<void> {
	return updateDoc(getNoteDocRef($authStore, note.folderId as string, note.id as string), {
		...note
	}).catch((error) => console.error("Error updating note: ", error));
}

export function deleteNote(
	$authStore: UserAuthState,
	folderId?: string,
	noteId?: string
): Promise<void> {
	return deleteDoc(getNoteDocRef($authStore, folderId as string, noteId as string)).catch(
		(error) => console.error("Error deleting note: ", error)
	);
}

function getNoteDocRef(
	$authStore: UserAuthState,
	folderId?: string,
	noteId?: string
): DocumentReference {
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
