<script lang="ts">
  import { fetchApi } from "../../../utils/fetchApi.ts";
  import { onMount } from "svelte";
  import current_collection_store from "../../../store/current_collection_store.ts";

  export let params;
  const { current_collection, current_phrase } = current_collection_store;

  onMount(async () => {
    // TODO: make router store not disappear for route change
    const c_result = await fetchApi(`api/v1/collections/${params.id}`);
    if (c_result.ok) {
      const json = await c_result.json();
      current_collection.set(json);
    }
    const result = await fetchApi(`api/v1/phrases/${params.p_id}`);
    if (result.ok) {
      const json = await result.json();
      current_phrase.set(json);
    } else {
      navigate("/", { replace: true });
    }
  });
</script>

<div class="flex flex-col place-content-between">
  {#if $current_phrase}
    <section class="">
      <h1 class="text-left">{$current_phrase.title}</h1>
      <p class="mb-4">{$current_phrase.description}</p>

      <!-- <audio src="{$current_phrase.recording}" control> -->
    </section>
  {/if}
</div>
