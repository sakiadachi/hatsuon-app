<script lang="ts">
import LinkBtn from "$lib/components/LinkBtn.svelte";
import currentCollectionStore from "$lib/store/currentCollectionStore";

const { currentCollection } = currentCollectionStore;
</script>

<svelte:head>
  <title>Collection</title>
  <meta name="description" content="Collection" />
</svelte:head>

<div>
  {#if $currentCollection}
    <h1 class="text-left">{$currentCollection.title}</h1>
    <h2 class="mb-8">
      {$currentCollection.description}
    </h2>

    <h3 class="text-lg mb-2">Phrases</h3>
    {#if $currentCollection.phrases.length > 0}
      <ul class="mb-10">
        {#each $currentCollection.phrases as phrase (phrase.uuid)}
          <li>
            <a
              href="/collection/{$currentCollection.uuid}/phrase/{phrase.uuid}"
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
        href="/collection/{$currentCollection.uuid}/phrase/create"
      />
    </div>
  {/if}
</div>
