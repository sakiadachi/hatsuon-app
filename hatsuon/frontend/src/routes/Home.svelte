<script lang="ts">
  import { onMount } from "svelte";
  import { fetchApi } from "../utils/fetchApi";
  import CollectionList from "./CollectionList.svelte";

  let collections: Collection[] = [];

  onMount(async () => {
    console.log("mount");
    const res = await fetchApi(
      `api/v1/collections/`,
      {
        method: "GET",
      },
      { "Content-Type": "application/json" },
    );
    if (res.ok) {
      const { results } = await res.json();
      collections = results;
    }
  });

  const createCollection = () => {};
</script>

<div class="">
  {#if collections.length > 0}
    <CollectionList {collections} />
  {:else}
    <p>No Collections</p>
  {/if}
  <div class="mt-10 flex justify-end">
    <button on:click={createCollection}>Create Collection</button>
  </div>
</div>
