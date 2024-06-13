import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  const fetchPhrase = () =>
    fetchApi(`api/v1/phrases/${params.id}/`)
      .then((res) => {
        if (!res.ok) {
          error(res.status, res.statusText);
        }
        return res.json();
      })
      .then((res) => res)
      .catch((err) => console.error(err));

  const fetchPhraseTakes = () =>
    fetchApi(`api/v1/takes/?phrase_uuid=${params.id}`)
      .then((res) => {
        if (!res.ok) {
          error(res.status, res.statusText);
        }
        return res.json();
      })
      .then((res) => res.results)
      .catch((err) => console.error(err));

  return {
    phrase: await fetchPhrase(),
    takes: await fetchPhraseTakes(),
  };
};
