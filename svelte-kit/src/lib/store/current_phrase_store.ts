import { derived, writable, type Readable, type Writable } from "svelte/store";

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

/**
 * current take list
 */
const current_takes: Writable<Take[]> = writable([]);

// methods

export default {
  current_phrase,
  phrase_title,
  phrase_id,
  current_takes,
};
