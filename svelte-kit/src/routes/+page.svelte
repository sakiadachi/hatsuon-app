<script lang="ts">
import LinkBtn from "$lib/components/LinkBtn.svelte";
import CollectionList from "./CollectionList.svelte";

export let data: {
  loginState: boolean;
  collections: Collection[];
};
const { collections } = data;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Hatsu-Oh! demo app" />
</svelte:head>

<section>
  <h1>Collections</h1>
  {#if collections.length}
    <CollectionList {collections} />
  {/if}
  <div class="flex justify-end mt-10">
    <LinkBtn text="Add Collection" href="/collection/create" />
  </div>
</section>
