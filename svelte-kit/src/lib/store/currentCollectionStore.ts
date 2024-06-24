import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import { writable, derived, type Writable, type Readable } from "svelte/store";

/**
 * Current Collection
 */
const currentCollection: Writable<Collection | undefined> = writable(undefined);

const collectionTitle: Readable<string> = derived(
  currentCollection,
  ($currentCollection) => $currentCollection?.title || "",
);
const collectionId: Readable<string> = derived(
  currentCollection,
  ($currentCollection) => $currentCollection?.uuid || "",
);

const fetchCurrentCollection = async (uuid: string) => {
  const result = await fetchApi(`api/v1/collections/${uuid}/`);
  if (result.ok) {
    const json = await result.json();
    currentCollection.set(json);
  } else {
    error(result.status, result.statusText);
  }
};

export default {
  // collection
  currentCollection,
  collectionId,
  collectionTitle,
  fetchCurrentCollection,
};
