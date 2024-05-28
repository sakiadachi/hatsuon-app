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
  ($current_collection) => $current_collection?.id || "",
);

/**
 * Current Phrase
 */
const current_phrase: Writable<Phrase | undefined> = writable(undefined);
const phrase_title: Readable<string> = derived(
  current_phrase,
  ($current_phrase) => $current_phrase?.title || "",
);
const phrase_id: Readable<string> = derived(
  current_phrase,
  ($current_phrase) => $current_phrase?.id || "",
);

export default {
  // collection
  current_collection,
  collection_id,
  collection_title,
  // phrase
  current_phrase,
  phrase_id,
  phrase_title,
};
