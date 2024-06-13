<script lang="ts">
  import { page } from "$app/stores";
  import {
    nav_items,
    type NavItem,
    type RouteName,
  } from "$lib/store/route/data";
  import current_data from "$lib/store/current_collection";
  import current_phrase_store from "$lib/store/current_phrase_store";
  import auth_store from "$lib/store/auth_store";

  // Selected Collection
  const { collection_id, collection_title } = current_data;
  const { phrase_id, phrase_title } = current_phrase_store;

  const { isLoggedIn } = auth_store;

  let route_id: string | null;
  $: route_id = $page.route.id;

  // Navigation items shown in breadcrumb according to current route
  let shown_nav_item: RouteName[];
  $: shown_nav_item = [];

  // Current route
  let current_route: NavItem;
  $: current_route = { name: "Home", route_id: "/" };

  $: {
    const nav_item = nav_items.find((item) => route_id === item.route_id);
    if (!nav_item) {
      current_route = nav_items[0];
      shown_nav_item = [];
    } else {
      current_route = nav_item;
      switch (nav_item.name) {
        case "Login":
          shown_nav_item = [];
          break;
        case "Logout":
          shown_nav_item = [];
          break;
        case "Home":
          shown_nav_item = ["Home"];
          break;
        case "CollectionDetail":
          shown_nav_item = ["Home", "CollectionDetail"];
          break;
        case "CollectionCreate":
          shown_nav_item = ["Home", "CollectionCreate"];
          break;
        case "PhraseCreate":
          shown_nav_item = ["Home", "CollectionDetail", "PhraseCreate"];
          break;
        case "PhraseDetail":
          shown_nav_item = ["Home", "CollectionDetail", "PhraseDetail"];
      }
    }
  }
</script>

<header class="flex w-full p-4 max-w-screen-lg m-auto">
  <nav class="grow flex justify-between">
    <ul class="breadcrumb flex">
      {#if shown_nav_item.includes("Home")}
        <li
          aria-current={current_route.name === "Home" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/">Home</a>
        </li>
      {/if}
      {#if shown_nav_item.includes("CollectionDetail")}
        <li
          aria-current={current_route.name === "CollectionDetail"
            ? "page"
            : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/collection/{$collection_id}">{$collection_title}</a>
        </li>
      {/if}
      {#if shown_nav_item.includes("CollectionCreate")}
        <li
          aria-current={current_route.name === "CollectionCreate"
            ? "page"
            : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/collection/create">Create Collection</a>
        </li>
      {/if}
      {#if shown_nav_item.includes("PhraseCreate")}
        <li
          aria-current={current_route.name === "PhraseCreate"
            ? "page"
            : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/collection/{$collection_id}/phrase/create">Create Phrase</a>
        </li>
      {/if}

      {#if shown_nav_item.includes("PhraseDetail")}
        <li
          aria-current={current_route.name === "PhraseDetail"
            ? "page"
            : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/collection/{$collection_id}/phrase/{$phrase_id}"
            >{$phrase_title}</a
          >
        </li>
      {/if}
    </ul>

    <ul class="breadcrumb flex">
      {#if $isLoggedIn}
        <li
          aria-current={current_route.name === "Logout" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/logout">Log out</a>
        </li>
      {:else}
        <li
          aria-current={current_route.name === "Login" ? "page" : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/login">Login</a>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style scoped>
  .breadcrumb li:not(:last-child)::after {
    display: inline-block;
    margin: 0 0.5rem;
    content: "/";
  }
</style>
