<script lang="ts">
  import LinkBtn from "$lib/components/LinkBtn.svelte";
  import { onMount } from "svelte";
  import CollectionList from "./CollectionList.svelte";
  import collection_store from "$lib/store/collection_store";

  // Can't use server side because of using CSRF token stored in browser!
  // export let data: PageData;

  const { collections, fetch_collection } = collection_store;

  onMount(() => {
    fetch_collection();
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Hatsu-Oh! demo app" />
</svelte:head>

<section>
  {#if $collections.length}
    <CollectionList collections={$collections} />
  {/if}
  <div class="flex justify-end mt-10">
    <LinkBtn text="Add" href="/collection/create" />
  </div>
</section>
