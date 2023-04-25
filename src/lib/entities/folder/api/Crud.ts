import {
	DocumentReference,
	addDoc,
	collection,
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

export function addFolder($authStore: UserAuthState, title: string): Promise<Folder> {
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
			const docRef = folder as DocumentReference;
			return updateDoc(docRef, { id: docRef.id }).then(() => getFolderByRef(docRef));
		});
}

export function getFolders($authStore: UserAuthState): Promise<Folder[]> {
	return getDocs(collection(db, "users", $authStore.currentUser.uid as string, "folders"))
		.catch((error) => console.error("Error getting folders: ", error))
		.then((folders) =>
			(folders as QuerySnapshot).docs.map((folderSnap) => folderSnap.data() as Folder)
		);
}

export function getFolderByRef(folderDocRef: DocumentReference): Promise<Folder> {
	return getDoc(folderDocRef)
		.catch((error) => console.error("Error getting folder: ", error))
		.then((folder) => (folder as DocumentSnapshot).data() as Folder);
}

export function updateFolder($authStore: UserAuthState, folder: Folder): Promise<void> {
	return updateDoc(getFolderDocRef($authStore, folder.id), {
		...folder
	}).catch((error) => console.error("Error updating folder: ", error));
}

export function deleteFolder($authStore: UserAuthState, folderId?: string): Promise<void> {
	return deleteDoc(getFolderDocRef($authStore, folderId));
}

function getFolderDocRef($authStore: UserAuthState, folderId?: string): DocumentReference {
	if (!folderId) {
		throw new Error("Folder id is required");
	}

	return doc(db, "users", $authStore.currentUser.uid as string, "folders", folderId);
}
