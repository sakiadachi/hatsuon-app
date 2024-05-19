<script lang="ts">
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import { currentRoute } from "../store/router";
  import auth_store from "../store/auth_store.ts";
  import current_collection_store from "../store/current_collection_store.ts";

  let shown_nav_item: string[] = [];

  const { isLoggedIn } = auth_store;
  const { collection_id, collection_title, phrase_id, phrase_title } =
    current_collection_store;

  $: {
    switch ($currentRoute) {
      case "/":
        shown_nav_item = [];
        break;
      case "/collections/:id":
        shown_nav_item = ["/collections"];
        break;
      case "/collections/:id/phrase/:p_id":
        shown_nav_item = ["/collections", "/phrase"];
        break;
      case "/login":
        shown_nav_item = ["/login"];
        break;
      case "/logout":
        shown_nav_item = ["/logout"];
    }
  }
</script>

<header class="flex w-full p-4">
  <nav class="grow flex justify-between">
    <ul class="breadcrumb flex">
      {#if $isLoggedIn}
        <li
          aria-current={$currentRoute === "/" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <Link to="/">Home</Link>
        </li>
        {#if shown_nav_item.includes("/collections")}
          <li
            aria-current={$currentRoute === "/collections/:id"
              ? "page"
              : undefined}
            class="aria-[current=page]:font-bold"
          >
            <Link to="/collections/{$collection_id}">{$collection_title}</Link>
          </li>
        {/if}
        {#if shown_nav_item.includes("/phrase")}
          <li
            aria-current={$currentRoute === "/collections/:id/phrase/:p_id"
              ? "page"
              : undefined}
            class="aria-[current=page]:font-bold"
          >
            <Link to="/collections/{$collection_id}/phrase/{$phrase_id}"
              >{$phrase_title}</Link
            >
          </li>
        {/if}
      {/if}
    </ul>
    <ul class="flex">
      {#if $isLoggedIn}
        <li
          aria-current={$currentRoute === "/logout" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <Link to="/logout">Log out</Link>
        </li>
      {:else}
        <li
          aria-current={$currentRoute === "/login" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <Link to="/login">Log in</Link>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  .breadcrumb li:not(:last-child)::after {
    display: inline-block;
    margin: 0 0.5rem;
    content: "/";
  }
</style>
