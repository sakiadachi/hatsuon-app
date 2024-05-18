import { writable, derived, type Writable, type Readable } from "svelte/store";
import { Collection, Phrase } from "./types/collection";

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
  ($current_phrase) => $current_phrase?.uuid || "",
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
