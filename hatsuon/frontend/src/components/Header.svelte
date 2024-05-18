<script lang="ts">
  import { Link } from "svelte-routing";
  import { currentRoute } from "../store/router";
  import auth_store from "../store/auth_store.ts";
  import current_collection_store from "../store/current_collection_store.ts";

  let shown_nav_item: string[] = [];

  const { isLoggedIn } = auth_store;
  const { collection_id, collection_title } = current_collection_store;

  $: {
    switch ($currentRoute) {
      case "/":
        shown_nav_item = [];
        break;
      case "/collection/":
        shown_nav_item = ["/collection/"];
        break;
      case "/phrase/":
        shown_nav_item = ["/collection/", "/phrase/"];
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

        {#if shown_nav_item.includes("/collection/")}
          <li
            aria-current={$currentRoute === "/collection/" ? "page" : undefined}
            class="aria-[current=page]:font-bold"
          >
            <Link to="/collection/{$collection_id}">{$collection_title}</Link>
          </li>
        {/if}
        {#if shown_nav_item.includes("/phrase/")}
          <li
            aria-current={$currentRoute === "/phrase/" ? "page" : undefined}
            class="aria-[current=page]:font-bold"
          >
            <Link to="/phrase">Collection</Link>
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
