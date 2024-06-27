<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import authStore from "$lib/store/authStore";

  let errorMessages: Record<string, string[]> = {};

  const { isLoggedIn, signup } = authStore;

  const handleSubmit = async (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) => {
    errorMessages = {};

    const formData = new FormData(event.currentTarget);

    const authUser = {
      username: formData.get("username")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password1: formData.get("password1")?.toString() ?? "",
      password2: formData.get("password2")?.toString() ?? "",
    } as AuthUser;

    const result = await signup(authUser);
    if (!result.ok) {
      isLoggedIn.set(false);
      const msgs = await result.json();
      errorMessages = msgs;
    } else {
      isLoggedIn.set(true);
      goto("/", { replaceState: true });
    }
  };
</script>

<svelte:head>
  <title>Sign up Hatsu-Oh! App</title>
  <meta name="description" content="Hatsu-Oh! app login page" />
</svelte:head>

<Logo />
<h1 class="mt-8">Sign up</h1>
<form
  on:submit|preventDefault={handleSubmit}
  class="grid grid-rows-4 mt-12 gap-4"
>
  <div class="grid grid-rows-[1fr_3rem]">
    <label class="grid grid-cols-[50%_50%]">
      <span class="mr-4">User Name (required)</span>
      <input type="text" name="username" required class="w-64 border" />
    </label>
    <p class="text-red-500">
      {#if errorMessages.username}
        {#each errorMessages.username as err}
          {err}
        {/each}
      {/if}
    </p>
  </div>

  <div class="grid grid-rows-[1fr_3rem]">
    <label class="grid grid-cols-[50%_50%]">
      <span class="mr-4">Email (required)</span>
      <input type="email" name="email" required class="w-64 border" />
    </label>
    <p class="text-red-500">
      {#if errorMessages.email}
        {#each errorMessages.email as err}
          {err}
        {/each}
      {/if}
    </p>
  </div>

  <div>
    <label class="grid grid-cols-[50%_50%]">
      <span class="mr-4">Password (required)</span>
      <input type="password" name="password1" required class="w-64 border" />
    </label>
    <p class="text-red-500">
      {#if errorMessages.password1}
        {#each errorMessages.password1 as err}
          {err}
        {/each}
      {/if}
    </p>
  </div>

  <div>
    <label class="grid grid-cols-[50%_50%]">
      <span class="mr-4">Confirm Password (required)</span>
      <input type="password" name="password2" required class="w-64 border" />
    </label>
    <p class="text-red-500">
      {#if errorMessages.password2}
        {#each errorMessages.password2 as err}
          {err}
        {/each}
      {/if}
    </p>
  </div>

  <div>
    <p class="text-red-500">
      {#if errorMessages.non_field_errors}
        {#each errorMessages.non_field_errors as err}
          {err}
        {/each}
      {/if}
    </p>
  </div>

  <div class="flex justify-center mt-10">
    <Button type="submit" text="Create Account" />
  </div>
</form>
