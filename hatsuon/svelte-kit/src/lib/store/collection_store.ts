import { fetchApi } from "$lib/utils/fetchApi";
import { writable, type Writable } from "svelte/store";

/**
 * Current Collection
 */
const collections: Writable<Collection[]> = writable([]);

const fetch_collection = async () => {
  const result = await fetchApi("api/v1/collections/");
  if (result.ok) {
    const items = await result.json();
    collections.set(items.results);
    return;
  }
  collections.set([]);
};

const add_collection = async (collection: Collection) => {
  const result = await fetchApi(
    "api/v1/collections/",
    {
      method: "POST",
      body: JSON.stringify(collection),
    },
    { "Content-Type": "application/json" },
  );
  if (result.ok) {
    console.log("ok");
  }
};

const add_phrase = async (phrase: Phrase) =>
  fetchApi(
    "api/v1/phrases/",
    {
      method: "POST",
      body: JSON.stringify(phrase),
    },
    { "Content-Type": "application/json" },
  );

export default {
  collections,
  fetch_collection,
  add_collection,
  add_phrase,
};
