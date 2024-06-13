<script lang="ts">
  import { onMount } from "svelte";
  import LinkBtn from "$lib/components/LinkBtn.svelte";
  import current_collection_store from "$lib/store/current_collection";

  export let data;
  const { collection } = data;
  const { current_collection } = current_collection_store;

  onMount(() => {
    current_collection.set(collection);
  });
</script>

<svelte:head>
  <title>Collection</title>
  <meta name="description" content="Collection" />
</svelte:head>

<div>
  {#if $current_collection}
    <h1 class="text-left">{$current_collection.title}</h1>
    <h2 class="mb-8">
      {$current_collection.description}
    </h2>

    <h3 class="text-lg mb-2">Phrases</h3>
    {#if $current_collection.phrases.length > 0}
      <ul class="mb-10">
        {#each $current_collection.phrases as phrase}
          <li>
            <a
              href="/collection/{$current_collection.uuid}/phrase/{phrase.uuid}"
              class="block pl-4 py-1 hover:bg-slate-100">{phrase.title}</a
            >
          </li>
        {/each}
      </ul>
    {:else}
      <p>you don't have a phrase yet!</p>
    {/if}

    <div class="flex justify-end">
      <LinkBtn
        text="Add"
        href="/collection/{$current_collection.uuid}/phrase/create"
      />
    </div>
  {/if}
</div>
