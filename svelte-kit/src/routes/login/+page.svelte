<script lang="ts">
  import authStore from "$lib/store/authStore";
  import Logo from "$lib/components/Logo.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data;

  const { loginState } = data;
  const { login } = authStore;

  const handleSubmit = async (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) => {
    if (event.target == null) {
      return;
    }

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const username = formData.get("username")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const result = await login(username, password);
    if (!result.ok) {
      alert("Login failed. Please try again.");
    }
  };
</script>

<svelte:head>
  <title>Hatsu-Oh! App Login</title>
  <meta name="description" content="Hatsu-Oh! app login page" />
</svelte:head>

<Logo />
<form
  on:submit|preventDefault={handleSubmit}
  class="flex flex-col items-center mt-12 gap-4"
>
  <label class="flex justify-between w-full max-w-96">
    <span class="mr-4">User Name:</span>
    <input type="text" name="username" class="w-64 border" />
  </label>
  <label class="flex justify-between w-full max-w-96 mb-8">
    <span class="mr-4">Password:</span>
    <input type="password" name="password" class="w-64 border" />
  </label>
  <Button type="submit" text="Login" />
</form>
