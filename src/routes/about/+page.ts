import type { PageLoad } from "../../../.svelte-kit/types/src/routes/about/$types";

export const load: PageLoad = async ({ params }) => {
	return {
		title: "About us",
		content: "Who are the creators of the project."
	};
};
