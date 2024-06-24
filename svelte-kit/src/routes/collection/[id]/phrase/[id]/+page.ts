import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import currentPhraseStore from "$lib/store/currentPhraseStore";

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
      .then((res) => {
        currentPhraseStore.currentPhrase.set(res);
      });

  const fetchPhraseTakes = () =>
    fetchApi(`api/v1/takes/?phrase_uuid=${params.id}`)
      .then((res) => {
        if (!res.ok) {
          error(res.status, res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        currentPhraseStore.curentTakes.set(res.results);
      });

  Promise.all([fetchPhrase(), fetchPhraseTakes()]);
  return {};
};
