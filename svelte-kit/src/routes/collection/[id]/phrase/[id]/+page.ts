import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import currentPhraseStore from "$lib/store/currentPhraseStore";

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  const fetchPhrase = (): Promise<Phrase> =>
    fetchApi(`api/v1/phrases/${params.id}/`).then((res) => {
      if (!res.ok) {
        error(res.status, res.statusText);
      }
      return res.json();
    });

  const fetchPhraseTakes = (): Promise<Take[]> =>
    fetchApi(`api/v1/takes/?phrase_uuid=${params.id}`).then(async (res) => {
      if (!res.ok) {
        error(res.status, res.statusText);
      }
      const result = await res.json();
      return result.results;
    });

  const [phrase, takes] = await Promise.all([
    fetchPhrase(),
    fetchPhraseTakes(),
  ]);
  currentPhraseStore.currentPhrase.set(phrase);
  currentPhraseStore.currentTakes.set(takes);
  return {};
};
