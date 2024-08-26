<script lang="ts">
import authStore from "$lib/store/authStore";
import Logo from "$lib/components/Logo.svelte";
import Button from "$lib/components/Button.svelte";
import LoggedInMessage from "$lib/components/LoggedInMessage.svelte";
import { goto } from "$app/navigation";

const { isLoggedIn, login } = authStore;

const handleSubmit = async (
  event: SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  },
) => {
  const formData = new FormData(event.currentTarget);
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
<h1 class="my-8">Login</h1>
{#if $isLoggedIn}
  <LoggedInMessage />
{:else}<form
    on:submit|preventDefault={handleSubmit}
    class="flex flex-col items-center gap-4"
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

  <h2 class="mt-16 text-center">You don't have an account?</h2>
  <div class="flex justify-center mt-4">
    <Button
      text="Sign up"
      on:click={() => {
        goto("/signup");
      }}
    />
  </div>
{/if}
