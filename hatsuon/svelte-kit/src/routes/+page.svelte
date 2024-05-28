<script lang="ts">
  import LinkBtn from "$lib/components/LinkBtn.svelte";
  import type { PageData } from "./$types";
  import CollectionList from "./CollectionList.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Hatsu-Oh! demo app" />
</svelte:head>

<section>
  <CollectionList collections={data.collections} />
  <div class="flex justify-end mt-10">
    <LinkBtn text="Add" href="/collection/create" />
  </div>
</section>
