<script lang="ts">
import { onMount } from "svelte";
import authStore from "$lib/store/authStore";
import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
import storeController from "$lib/store/storeController";

const { logout } = authStore;
const { resetStores } = storeController;

let isLoading = false;
let logoutSuccess = false;

onMount(async () => {
  isLoading = true;
  // Reset stores before logout
  // Ignore the case failing logout request
  resetStores();
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
