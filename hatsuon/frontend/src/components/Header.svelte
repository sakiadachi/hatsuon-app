<script lang="ts">
import { Link } from "svelte-routing";
import { currentRoute } from "../store/router";
import auth_store from "../store/auth_store.ts";

let shown_nav_item: string[] = [];

const { isLoggedIn } = auth_store;

$: {
	if (!shown_nav_item.includes($currentRoute)) {
		shown_nav_item.push($currentRoute);
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

        {#if shown_nav_item.includes("/collection")}
          <li
            aria-current={$currentRoute === "/collection" ? "page" : undefined}
            class="aria-[current=page]:font-bold"
          >
            <Link to="/collection">Collection</Link>
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
