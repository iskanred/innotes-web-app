<script lang="ts">
	import { Button, Stack, Text, TextInput, Title } from "@svelteuidev/core";
	import { EnvelopeClosed, EyeClosed, EyeOpen } from "radix-icons-svelte";
	import { signInMethod, SignMethod, signUpMethod } from "$lib/pages/auth/model/SignMethod";
	import type { AuthData } from "$lib/pages/auth/model/AuthData";
	import type { ValidationErrors } from "$lib/pages/auth/model/Validation";
	import { validateAuthData } from "$lib/pages/auth/model/Validation";

	let authData: AuthData = {
		email: "",
		password: "",
		passwordConfirm: ""
	};
	let validationErrors: ValidationErrors = {
		emailErrorText: "",
		passwordErrorText: "",
		passwordConfirmErrorText: "",
		hasErrors: false
	};
	let signMethod: SignMethod = signInMethod;

	function handleChangeSignType() {
		if (signMethod === signInMethod) {
			signMethod = signUpMethod;
		} else if (signMethod === signUpMethod) {
			signMethod = signInMethod;
		}
	}

	function handleSubmit() {
		validationErrors = validateAuthData(authData);
		if (!validationErrors.hasErrors) {
			console.log("TODO");
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			handleSubmit();
		}
	}
</script>

<div id="title">
	<Title order={1} size={48} weight="extrabold">
		{signMethod.title}
	</Title>
</div>

<div id="stack">
	<Stack spacing={24} align="stretch">
		<TextInput
			placeholder="Enter e-mail"
			label="E-mail"
			type="email"
			icon={EnvelopeClosed}
			required
			error={validationErrors.emailErrorText}
			on:click={() => {
				validationErrors.emailErrorText = "";
			}}
			bind:value={authData.email}
		/>
		<TextInput
			placeholder="Enter password"
			label="Password"
			type="password"
			icon={authData.password ? EyeClosed : EyeOpen}
			required
			error={validationErrors.passwordErrorText}
			on:click={() => {
				validationErrors.passwordErrorText = "";
			}}
			bind:value={authData.password}
		/>
		{#if signMethod === signUpMethod}
			<TextInput
				placeholder="Enter password again"
				label="Password confirmation"
				type="password"
				icon={authData.passwordConfirm ? EyeClosed : EyeOpen}
				required
				error={validationErrors.passwordConfirmErrorText}
				on:click={() => {
					validationErrors.passwordConfirmErrorText = "";
				}}
				on:submit={handleSubmit}
				bind:value={authData.passwordConfirm}
			/>
		{/if}
		<Button type="submit" ripple on:click={handleSubmit}>
			{signMethod.buttonText}
		</Button>
		<Text on:click={handleChangeSignType} align="center" underline>
			{signMethod.questionToChangeMethod}
		</Text>
	</Stack>
</div>

<style>
	#title {
		margin-bottom: 72px;
	}

	#stack {
		min-width: 18vw;
	}
</style>
