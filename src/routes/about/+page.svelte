<script lang="ts">
	import { Title } from "@svelteuidev/core";
	import MemberPage from "$lib/pages/about/ui/MemberPaper.svelte";
	import { members } from "$lib/pages/about/model/Members.js";
</script>

<main>
	<Title order={1} size={48} weight="extrabold">Who we are?</Title>
	<Title order={2} size={36} weight="semibold">Innotes Team</Title>
	<ul>
		{#each members as member}
			<li>
				<MemberPage {member} />
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		height: 100%;
		width: 100%;

		margin-top: 24px;
		gap: 36px;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 12px;

		list-style-type: none;
	}

	li {
		width: 700px;
	}
</style>
