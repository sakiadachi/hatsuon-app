<script lang="ts">
  import LinkBtn from "$lib/components/LinkBtn.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  const { collection } = data;
</script>

<svelte:head>
  <title>Collections</title>
  <meta name="description" content="Practice your phrase" />
</svelte:head>

<div>
  <h1 class="text-left">{collection.title}</h1>
  <h2 class="mb-8">
    {collection.description}
  </h2>

  <h3 class="text-lg mb-2">Phrases</h3>
  {#if collection.phrases.length > 0}
    <ul class="mb-10">
      {#each collection.phrases as phrase}
        <li>
          <a
            href="/collection/{collection.id}/phrase/{phrase}"
            class="block pl-4 py-1 hover:bg-slate-100">{phrase}</a
          >
        </li>
      {/each}
    </ul>
  {:else}
    <p>you don't have a phrase yet!</p>
  {/if}

  <div class="flex justify-end">
    <LinkBtn text="Add" href="/collection/{collection.id}/phrase/create" />
  </div>
</div>
