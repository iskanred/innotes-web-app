<script lang="ts">
	import { ActionIcon, Group, Stack, Text } from "@svelteuidev/core";
	import { EnvelopeClosed, GithubLogo } from "radix-icons-svelte";
	import type { Member } from "$lib/entities/member/Member";

	export let member: Member;

	const iconSize = 32;
</script>

<Stack align="flex-end">
	<Text size={40} align="right">
		{member.name}
	</Text>
	<Text size={24} weight="extralight">
		{member.role}
	</Text>
	<Group>
		<ActionIcon root="a" href={member.github}>
			<GithubLogo size={iconSize} />
		</ActionIcon>
		<ActionIcon root="a" href="mailto:{member.email}">
			<EnvelopeClosed size={iconSize} />
		</ActionIcon>
	</Group>
</Stack>
