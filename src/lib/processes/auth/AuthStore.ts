import { writable } from "svelte/store";
import { auth } from "$lib/processes/auth/FirebaseClient";
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";

interface UserAuthState {
	loggedIn: boolean;
	currentUser: any;
}

interface AuthHandlers {
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
}

const userAuthState: UserAuthState = {
	loggedIn: false,
	currentUser: null
};

export const authStore = writable(userAuthState);

export const authHandlers: AuthHandlers = {
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email) => {
		await sendPasswordResetEmail(auth, email);
	}
};
