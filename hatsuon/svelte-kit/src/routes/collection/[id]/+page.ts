import { error } from "@sveltejs/kit";
import { collections } from "../../data";
import current_data from "$lib/store/current_correction";

const { current_collection } = current_data;

export function load({ params }) {
  const collection: Collection | undefined = collections.find(
    (c) => c.id === params.id,
  );
  if (collection == null) {
    current_collection.set(undefined);
    throw error(404);
  }
  current_collection.set(collection);
  return {
    collection,
  };
}
