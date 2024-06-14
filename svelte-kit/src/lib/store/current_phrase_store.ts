import { fetchApi } from "$lib/utils/fetchApi";
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
 * Takes
 */
const current_takes: Writable<Take[]> = writable([]);

// methods

/**
 * Fetch takes with phrase id
 * @param phrase_id
 * @returns
 */
const fetchTakes = (phrase_id: string) =>
  fetchApi(`api/v1/takes/?phrase_uuid=${phrase_id}`)
    .then((result) => result.json())
    .then((result) => {
      current_takes.set(result.results);
    })
    .catch((error) => console.error(error));

/**
 * Delete Take
 * @param take_uuid uuid of Take
 */
const deleteTake = (take_uuid: string) =>
  fetchApi(`api/v1/takes/${take_uuid}/`, {
    method: "DELETE",
  });

export default {
  current_phrase,
  phrase_title,
  phrase_id,
  current_takes,
  // methods
  fetchTakes,
  deleteTake,
};
