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
    <h1 class="text-left">Collection: {$currentCollection.title}</h1>
    <p class="mb-8">{$currentCollection.description}</p>

    <h4 class="text-lg mb-2">Phrases</h4>
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
        text="Add Phrase"
        href="/collection/{$currentCollection.uuid}/phrase/create"
      />
    </div>
  {/if}
</div>
