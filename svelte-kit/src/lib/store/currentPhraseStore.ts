import { fetchApi } from "$lib/utils/fetchApi";
import { error } from "@sveltejs/kit";
import { derived, writable, type Readable, type Writable } from "svelte/store";

/**
 * Current Phrase
 */
const currentPhrase: Writable<Phrase | undefined> = writable(undefined);
const phraseTitle: Readable<string> = derived(
  currentPhrase,
  ($currentPhrase) => $currentPhrase?.title || "",
);
const phraseId: Readable<string> = derived(
  currentPhrase,
  ($currentPhrase) => $currentPhrase?.uuid || "",
);

/**
 * Save a recording to an existed Take
 * @param recording
 * @param take
 */
const saveRecordingToPhrase = async (
  recording: File,
  phrase: Phrase,
): Promise<Phrase | void> => {
  const formData = new FormData();

  Object.entries(phrase).forEach(([key, value], index) => {
    // @ts-ignore-nextline
    formData.append(key, value);
  });
  formData.append("recording", recording);

  const result = await fetchApi(`api/v1/phrases/${phrase.uuid}/`, {
    method: "PUT",
    body: formData,
  });
  if (result.ok) {
    return await result.json();
  } else {
    error(result.status, result.statusText);
  }
};

/**
 * Takes
 */
const currentTakes: Writable<Take[]> = writable([]);

/**
 * Fetch takes with phrase uuid
 * @param phraseUuid
 * @returns
 */
const fetchTakesWithPhraseUuid = (phraseUuid: string) =>
  fetchApi(`api/v1/takes/?phrase_uuid=${phraseUuid}`)
    .then((result) => result.json())
    .then((result) => {
      currentTakes.set(result.results);
    })
    .catch((error) => console.error(error));

/**
 * Delete Take
 * @param takeUuid uuid of Take
 * @param phraseId uuid of Phrase
 */
const deleteTake = async (takeUuid: string, phraseId: string) => {
  const result = await fetchApi(`api/v1/takes/${takeUuid}/`, {
    method: "DELETE",
  });
  if (result.ok) {
    await fetchTakesWithPhraseUuid(phraseId);
  } else {
    error(result.status, result.statusText);
  }
};

/**
 * Reset Store states
 * Edit here when adding a state
 */
const resetStore = () => {
  currentPhrase.set(undefined);
  currentTakes.set([]);
};

export default {
  currentPhrase,
  phraseTitle,
  phraseId,
  saveRecordingToPhrase,
  // takes
  currentTakes,
  fetchTakesWithPhraseUuid,
  deleteTake,
  resetStore,
};
