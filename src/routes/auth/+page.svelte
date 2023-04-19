<script lang="ts">
	import AuthForm from "$lib/pages/auth/ui/AuthForm.svelte";
</script>

<main>
	<AuthForm />
</main>

<style>
	main {
		height: 70vh;
		width: 100%;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
</style>
