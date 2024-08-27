import { fetchApi } from "$lib/utils/fetchApi";
import { writable, type Writable } from "svelte/store";

export type RecordingType = {
  src: string;
  uuid: string;
  file: File;
};

const localRecordings: Writable<RecordingType[]> = writable([]);
const recordWithPhrase = writable(false);

const filterRecording = (
  recordings: RecordingType[],
  recording: RecordingType,
) => recordings.filter((r) => r.uuid !== recording.uuid);

/**
 * Save local recording to database as Take
 */
const saveRecording = (recording: RecordingType, phrase_id: number) => {
  const formData = new FormData();
  formData.append("recording", recording.file);
  formData.append("phrase", phrase_id.toString());

  return fetchApi("api/v1/takes/", {
    method: "POST",
    body: formData,
  });
};

const resetState = () => {
  localRecordings.set([]);
  recordWithPhrase.set(false);
};

export default {
  localRecordings,
  recordWithPhrase,
  filterRecording,
  saveRecording,
  resetState,
};
