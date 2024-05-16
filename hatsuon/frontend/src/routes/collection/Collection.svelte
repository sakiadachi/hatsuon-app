<script lang="ts">
import { Route, useRouter, useLocation } from "svelte-routing";
import { beforeUpdate, onMount } from "svelte";
import { fetchApi } from "../../utils/fetchApi";
import CollectionDetail from "./CollectionDetail.svelte";
import currentCollectionStore from "../../store/current_collection.ts";

// selected collection uuid
export let params;

const { current_collection } = currentCollectionStore;

beforeUpdate(async () => {
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
<CollectionDetail collection={$current_collection} />
</div>