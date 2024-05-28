<script lang="ts">
	import auth_store from '$lib/store/auth_store';

	const { login } = auth_store;

	const handleSubmit = async (
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		event.preventDefault();
		if (event.target == null) {
			return;
		}

		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);
		const username = formData.get('username')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		await login(username, password);
	};
</script>

<h1 class="text-center mb-8">Login</h1>
<form on:submit={handleSubmit} class="flex flex-col items-center gap-4">
	<label class="flex justify-between w-full max-w-96">
		<span class="mr-4">User Name:</span>
		<input type="text" name="username" class="w-64 border" />
	</label>
	<label class="flex justify-between w-full max-w-96 mb-8">
		<span class="mr-4">Password:</span>
		<input type="password" name="password" class="w-64 border" />
	</label>
	<button type="submit" class="w-full max-w-96">submit</button>
</form>
