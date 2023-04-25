import type { PageLoad } from "../../../.svelte-kit/types/src/routes/about/$types";

export const load: PageLoad = async ({ params }) => {
	return {
		title: "Log in",
		content: "Sign in or sing up into the website."
	};
};
