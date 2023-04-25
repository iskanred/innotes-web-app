import type { PageLoad } from "../../../.svelte-kit/types/src/routes/about/$types";

export const load: PageLoad = async ({ params }) => {
	return {
		title: "Your notes",
		content:
			"Create or modify folders or topics, create or modify your notes. Check all your writings."
	};
};
