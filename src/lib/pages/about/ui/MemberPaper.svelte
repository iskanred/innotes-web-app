<script lang="ts">
	import { Image, Paper } from "@svelteuidev/core";
	import type { Member } from "$lib/entities/member/model/Member";
	import MemberInfoPart from "$lib/pages/about/ui/MemberInfoPart.svelte";

	export let member: Member;

	const imageSize = 180;
</script>

<Paper withBorder shadow="sm">
	<div class="member_card">
		<Image
			src={member.pathToPhoto}
			height={imageSize}
			width={imageSize}
			radius={16}
			alt="{member.name}'s photo"
		/>
		<MemberInfoPart {member} />
	</div>
</Paper>

<style>
	.member_card {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		text-align: center;
	}
</style>
