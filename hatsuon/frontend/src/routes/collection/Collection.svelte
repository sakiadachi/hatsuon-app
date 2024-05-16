<script lang="ts">
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { fetchApi } from "../../utils/fetchApi";
  import CollectionDetail from "./CollectionDetail.svelte";
  import currentCollectionStore from "../../store/current_collection";

  // selected collection uuid
  export let params;

  const { current_collection } = currentCollectionStore;

  onMount(async () => {
    console.log("mount");
    const result = await fetchApi(`api/v1/collections/${params.id}`);
    if (result.ok) {
      const json = await result.json();
      current_collection.set(json);
    } else {
      navigate("/", { replace: true });
    }
  });
</script>

<div>
  {#if $current_collection}
    <CollectionDetail collection={$current_collection} />
  {/if}
</div>
