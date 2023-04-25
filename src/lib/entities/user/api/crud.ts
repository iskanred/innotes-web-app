import type { User } from "../model/User";
import { DocumentReference, getDoc, doc, DocumentSnapshot, setDoc } from "firebase/firestore";
import { db } from "$lib/shared/FirebaseClient";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";
import { addFolder } from "$lib/entities/folder/api/Crud";
import { addNote } from "$lib/entities/notes/api/Crud";

const DEFAULT_FOLDER_NAME = "Default";
const DEFAULT_NOTE_TITLE = "Default";

export async function addUser($authStore: UserAuthState): Promise<User> {
	const newUser: User = {
		id: $authStore.currentUser.uid,
		email: $authStore.currentUser.email,
		folders: []
	};
	try {
		await setDoc(doc(db, "users", newUser.id as string), newUser);
	} catch (error) {
		console.error("Error adding user: ", error);
	}
	const folder = await addFolder($authStore, DEFAULT_FOLDER_NAME);
	await addNote($authStore, DEFAULT_NOTE_TITLE, "", folder.id);
	return await getUser($authStore);
}

export function getUser($authStore: UserAuthState): Promise<User> {
	return getUserByRef(getUserDocRef($authStore));
}

export function getUserByRef(userDocRef: DocumentReference): Promise<User> {
	return getDoc(userDocRef)
		.catch((error) => console.error("Error getting user: ", error))
		.then((user) => (user as DocumentSnapshot).data() as User);
}

function getUserDocRef($authStore: UserAuthState) {
	return doc(db, "users", $authStore.currentUser.uid as string);
}
