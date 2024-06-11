import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  let collection: Collection | undefined = undefined;
  const result = await fetchApi(`api/v1/collections/${params.id}/`);
  if (result.ok) {
    const item = await result.json();
    collection = item;
  } else {
    error(result.status, result.statusText);
  }

  return {
    collection,
  };
};
