<script lang="ts">
import "../app.css";
import { goto } from "$app/navigation";
import type { LayoutData } from "./$types";
import { onMount } from "svelte";
import { page, navigating } from "$app/stores";
import Header from "$lib/components/Header.svelte";
import authStore from "$lib/store/authStore";
import LoadingIndicator from "$lib/components/LoadingIndicator.svelte";
export let data: LayoutData;
const { loginState } = data;

const { isLoggedIn } = authStore;

onMount(() => {
  isLoggedIn.set(loginState);
  if (!loginState) {
    goto("/login", { replaceState: true });
  }
});
</script>

<div class="app flex flex-col min-h-screen">
  <Header />
  <main
    class="flex-1 flex flex-col p-4 w-full max-w-screen-sm my-0 mx-auto box-border"
  >
    {#if !$navigating}
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
