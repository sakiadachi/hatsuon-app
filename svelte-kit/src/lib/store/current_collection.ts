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

export default {
  // collection
  current_collection,
  collection_id,
  collection_title,
};
