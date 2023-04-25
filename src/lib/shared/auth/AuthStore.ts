import { writable } from "svelte/store";
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import type firebase from "firebase/compat";
import { auth } from "$lib/shared/FirebaseClient";

export interface UserAuthState {
	loggedIn: boolean;
	currentUser: firebase.User | any;
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
