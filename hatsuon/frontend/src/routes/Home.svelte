<script lang="ts">
  import { onMount } from "svelte";
  import { fetchApi } from "../utils/fetchApi";
  import CollectionList from "./CollectionList.svelte";
  import RouteWrapper from "./RouteWrapper.svelte";

  let collections: Collection[] = [];

  onMount(async () => {
    const res = await fetchApi(
      `api/v1/collections/`,
      {
        method: "GET",
      },
      { "Content-Type": "application/json" }
    );
    if (res.ok) {
      const { results } = await res.json();
      collections = results;
    }
  });

  const createCollection = () => {};
</script>

<RouteWrapper>
  <div>
    {#if collections.length > 0}
      <CollectionList {collections}></CollectionList>
    {:else}
      <p>No Collections</p>
    {/if}

    <button on:click={createCollection}>Create Collection</button>
  </div>
</RouteWrapper>
