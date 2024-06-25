import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import currentCollectionStore from "$lib/store/currentCollectionStore";

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  const result = await fetchApi(`api/v1/collections/${params.id}/`);
  if (result.ok) {
    const item = await result.json();
    currentCollectionStore.currentCollection.set(item);
  } else {
    error(result.status, result.statusText);
  }

  return {};
};
