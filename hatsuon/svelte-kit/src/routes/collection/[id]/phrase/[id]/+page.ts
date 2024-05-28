import { error } from "@sveltejs/kit";
import { phrases } from "../../../../data";
import current_data from "$lib/store/current_correction";

const { current_phrase } = current_data;
export const prerender = true;

export type AudioSrc = {
  src: string;
  name: string;
};

export function load({ params }) {
  const phrase: Phrase | undefined = phrases.find((p) => p.id === params.id);
  if (phrase == null) {
    current_phrase.set(undefined);
    throw error(404);
  }
  current_phrase.set(phrase);
  return {
    phrase,
  };
}
