import { authStore } from "$lib/processes/auth/AuthStore";
import { auth } from "$lib/processes/auth/FirebaseClient";
import type firebase from "firebase/compat";

export function setAuthStateHandler(): firebase.Unsubscribe {
	return auth.onAuthStateChanged((user) => {
		authStore.update((current) => {
			if (user) {
				return { ...current, isLoading: false, loggedIn: true, currentUser: user };
			} else {
				return { ...current, isLoading: false, loggedIn: false, currentUser: null };
			}
		});
	});
}
