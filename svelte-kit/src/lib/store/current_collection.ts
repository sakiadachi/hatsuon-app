import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import { writable, derived, type Writable, type Readable } from "svelte/store";

/**
 * Current Collection
 */
const current_collection: Writable<Collection | undefined> =
  writable(undefined);

const collection_title: Readable<string> = derived(
  current_collection,
  ($current_collection) => $current_collection?.title || "",
);
const collection_id: Readable<string> = derived(
  current_collection,
  ($current_collection) => $current_collection?.uuid || "",
);

const fetchCurrentCollection = async (uuid: string) => {
  const result = await fetchApi(`api/v1/collections/${uuid}/`);
  if (result.ok) {
    const json = await result.json();
    current_collection.set(json);
  } else {
    error(result.status, result.statusText);
  }
};

export default {
  // collection
  current_collection,
  collection_id,
  collection_title,
  fetchCurrentCollection,
};
