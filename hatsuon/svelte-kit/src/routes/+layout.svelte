<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
  import { onMount } from "svelte";
  import auth_store from "$lib/store/auth_store";
  import "../app.css";
  import { page, navigating } from "$app/stores";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  const { checkHasAuthenticated } = auth_store;

  let isLoading = false;
  const checkAuth = async () => {
    isLoading = true;
    await checkHasAuthenticated().catch(() => {
      goto("/login", { replaceState: true });
      isLoading = false;
    });
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
    <p>
      <a href="mailto:hello@sakiadachi.com" class="text-black"
        >Any comments? Send an email to the maintainer.</a
      >
    </p>
  </footer>
</div>
