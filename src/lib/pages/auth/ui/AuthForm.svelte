<script lang="ts">
	import { Alert, Button, Modal, Stack, Text, TextInput, Title } from "@svelteuidev/core";
	import { EnvelopeClosed, EyeClosed, EyeOpen, InfoCircled } from "radix-icons-svelte";

	import { signInMethod, SignMethod, signUpMethod } from "$lib/pages/auth/model/SignMethod";
	import type { AuthData } from "$lib/pages/auth/model/AuthData";
	import type { ValidationErrors } from "$lib/pages/auth/model/Validation";
	import { validateAuthData } from "$lib/pages/auth/model/Validation";

	import { authHandlers, authStore } from "$lib/shared/auth/AuthStore";
	import { notesPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import { addUser } from "$lib/entities/user/api/crud";

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

	let errorText = "";

	function handleChangeSignType() {
		if (signMethod === signInMethod) {
			signMethod = signUpMethod;
		} else if (signMethod === signUpMethod) {
			signMethod = signInMethod;
		}
	}

	function authUser() {
		if (signMethod === signInMethod) {
			authHandlers
				.login(authData.email, authData.password)
				.catch(() => {
					errorText = "User with such an email and a password does not exist!";
				})
				.then(() => {
					handleLogIn();
				});
		} else if (signMethod === signUpMethod) {
			authHandlers
				.signup(authData.email, authData.password)
				.catch(() => {
					errorText = "Sorry! Something went wrong...";
				})
				.then(() => {
					addUser($authStore);
					handleLogIn();
				});
		}
	}

	function handleLogIn() {
		if ($authStore.loggedIn) {
			goto(notesPagePath);
		}
	}

	function handleSubmit() {
		validationErrors = validateAuthData(authData, signMethod);
		if (!validationErrors.hasErrors) {
			authUser();
			handleLogIn();
		}
	}
</script>

<div id="title">
	<Title order={1} size={48} weight="extrabold">
		{signMethod.title}
	</Title>
</div>

<!-- Custom validation is used -->
<form novalidate>
	<Stack spacing={24} align="stretch">
		{#if errorText}
			<Modal
				centered
				opened
				on:close={() => (errorText = "")}
				withCloseButton={false}
				size="lg"
			>
				<Alert
					icon={InfoCircled}
					title="Oops!"
					on:close={() => (errorText = "")}
					withCloseButton
				>
					{errorText}
				</Alert>
			</Modal>
		{/if}
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
</form>

<style>
	#title {
		margin-bottom: 72px;
	}

	form {
		min-width: 18vw;
	}
</style>
