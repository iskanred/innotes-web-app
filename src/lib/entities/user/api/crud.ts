import type { User } from "../model/User";
import {
	DocumentReference,
	type DocumentData,
	getDoc,
	doc,
	DocumentSnapshot,
	setDoc
} from "firebase/firestore";
import { db } from "$lib/shared/FirebaseClient";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";
import { addFolder } from "$lib/entities/folder/api/crud";
import { addNote } from "$lib/entities/notes/api/crud";

const DEFAULT_FOLDER_NAME = "Default";
const DEFAULT_NOTE_TITLE = "Default";

export function addUser($authStore: UserAuthState) {
	const newUser: User = {
		id: $authStore.currentUser.uid,
		email: $authStore.currentUser.email,
		folders: []
	};
	return setDoc(doc(db, "users", newUser.id as string), newUser)
		.catch((error) => console.error("Error adding user: ", error))
		.then(() =>
			addFolder($authStore, DEFAULT_FOLDER_NAME).then((folder) =>
				addNote($authStore, DEFAULT_NOTE_TITLE, "", folder.id).then(() =>
					getUser($authStore)
				)
			)
		);
}

export function getUser($authStore: UserAuthState) {
	return getUserByRef(getUserDocRef($authStore));
}

export function getUserByRef(userDocRef: DocumentReference<DocumentData>) {
	return getDoc(userDocRef)
		.catch((error) => console.error("Error getting user: ", error))
		.then((user) => (user as DocumentSnapshot<DocumentData>).data() as User);
}

function getUserDocRef($authStore: UserAuthState) {
	return doc(db, "users", $authStore.currentUser.uid as string);
}
