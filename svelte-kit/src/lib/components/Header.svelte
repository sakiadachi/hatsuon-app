<script lang="ts">
import { page } from "$app/stores";
import { onMount } from "svelte";
import { nav_items, type NavItem, type RouteName } from "$lib/store/route/data";
import currentCollectionStore from "$lib/store/currentCollectionStore";
import currentPhraseStore from "$lib/store/currentPhraseStore";
import authStore from "$lib/store/authStore";

// Selected Collection
const {
  currentCollection,
  collectionId,
  collectionTitle,
  fetchCurrentCollection,
} = currentCollectionStore;
const { phraseId, phraseTitle } = currentPhraseStore;

const { isLoggedIn } = authStore;

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
        break;
      default:
        shown_nav_item = [];
    }
  }
}
const getCurrentCollection = () => {
  const { pathname } = $page.url;
  const matched = pathname.match(
    "(?<=/collection/)([a-zA-Z0-9-]+)(?=/phrase/.*$)",
  );
  if (matched && matched.length > 0) {
    fetchCurrentCollection(matched[0]);
  }
};

onMount(() => {
  if (!$currentCollection) {
    getCurrentCollection();
  }
});
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
          <a href="/collection/{$collectionId}">{$collectionTitle}</a>
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
          <a href="/collection/{$collectionId}/phrase/create">Create Phrase</a>
        </li>
      {/if}

      {#if shown_nav_item.includes("PhraseDetail")}
        <li
          aria-current={current_route.name === "PhraseDetail"
            ? "page"
            : undefined}
          class="aria-[current=page]:font-bold"
        >
          <a href="/collection/{$collectionId}/phrase/{$phraseId}"
            >{$phraseTitle}</a
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
