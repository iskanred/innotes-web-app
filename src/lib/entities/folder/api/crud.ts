import {
	DocumentReference,
	addDoc,
	collection,
	type DocumentData,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
	getDocs,
	QuerySnapshot,
	DocumentSnapshot
} from "firebase/firestore";
import { db } from "$lib/shared/FirebaseClient";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";
import type { Folder } from "../model/Folder";

export function addFolder($authStore: UserAuthState, title: string) {
	const newFolder: Folder = {
		name: title,
		notes: []
	};
	return addDoc(
		collection(db, "users", $authStore.currentUser.uid as string, "folders"),
		newFolder
	)
		.catch((error) => console.error("Error adding folder: ", error))
		.then((folder) => {
			const docRef = folder as DocumentReference<DocumentData>;
			return updateDoc(docRef, { id: docRef.id }).then(() => getFolderByRef(docRef));
		});
}

export function getFolders($authStore: UserAuthState) {
	return getDocs(collection(db, "users", $authStore.currentUser.uid as string, "folders"))
		.catch((error) => console.error("Error getting folders: ", error))
		.then((folders) =>
			(folders as QuerySnapshot<DocumentData>).docs.map(
				(folderSnap) => folderSnap.data() as Folder
			)
		);
}

export function getFolder($authStore: UserAuthState, folderId: string) {
	return getFolderByRef(getFolderDocRef($authStore, folderId));
}

export function getFolderByRef(folderDocRef: DocumentReference<DocumentData>) {
	return getDoc(folderDocRef)
		.catch((error) => console.error("Error getting folder: ", error))
		.then((folder) => (folder as DocumentSnapshot<DocumentData>).data() as Folder);
}

export function deleteFolder($authStore: UserAuthState, folderId?: string) {
	return deleteDoc(getFolderDocRef($authStore, folderId));
}

function getFolderDocRef($authStore: UserAuthState, folderId?: string) {
	if (!folderId) {
		throw new Error("Folder id is required");
	}

	return doc(db, "users", $authStore.currentUser.uid as string, "folders", folderId);
}
