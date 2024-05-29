<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
  import { beforeUpdate, onMount } from "svelte";
  import auth_store from "$lib/store/auth_store";
  import "../app.css";
  import { page, navigating } from "$app/stores";
  import { browser } from "$app/environment";

  const { checkHasAuthenticated } = auth_store;

  let isLoading = false;
  const checkAuth = async () => {
    isLoading = true;
    await checkHasAuthenticated();
    isLoading = false;
  };

  // TODO: better auth logic, see https://learn.svelte.dev/tutorial/route-groups
  $: if (
    $navigating &&
    browser &&
    $page.route.id !== "/login" &&
    $page.route.id !== "/logout"
  ) {
    checkAuth();
  }
  onMount(() => {
    checkAuth();
  });
</script>

<div class="app flex flex-col min-h-screen">
  <Header />
  <main
    class="flex-1 flex flex-col p-4 w-full max-w-screen-sm my-0 mx-auto box-border"
  >
    {#if isLoading}
      <LoadingIndicator />
    {:else}
      <slot />
    {/if}
  </main>

  <footer class="flex flex-col justify-center items-center p-4">
    This is a footer.
  </footer>
</div>
