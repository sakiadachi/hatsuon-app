<script lang="ts">
  import { onMount } from "svelte";
  import auth_store from "$lib/store/auth_store";
  import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";

  const { logout } = auth_store;

  let isLoading: boolean = false;
  let logoutSuccess: boolean = false;

  onMount(async () => {
    isLoading = true;
    logoutSuccess = await logout();
    isLoading = false;
  });
</script>

<svelte:head>
  <title>Hatsu-Oh! App Logout</title>
  <meta name="description" content="Hatsu-Oh! app logout page" />
</svelte:head>

<div class="flex flex-col items-center gap-4 mt-24">
  {#if isLoading}
    <LoadingIndicator />
  {/if}
  {#if logoutSuccess}
    <p>You have successfully logged out.</p>
    <a href="/login">Go to Login</a>
  {/if}
</div>
