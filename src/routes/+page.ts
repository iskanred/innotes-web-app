import type { PageLoad } from "../../.svelte-kit/types/src/routes/auth/$types";

export const load: PageLoad = async ({ params }) => {
	return {
		title: "About the project",
		content: "What is the idea of the project, how it goes and what is the functionality."
	};
};
