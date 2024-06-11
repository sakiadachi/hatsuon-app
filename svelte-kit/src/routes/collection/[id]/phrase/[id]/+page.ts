import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = false;

export type AudioSrc = {
  src: string;
  name: string;
};

export const load: PageLoad = async ({ params }) => {
  let phrase: Phrase | undefined = undefined;
  const result = await fetchApi(`api/v1/phrases/${params.id}/`);
  if (result.ok) {
    const item = await result.json();
    phrase = item;
  } else {
    error(result.status, result.statusText);
  }

  return {
    phrase,
  };
};
