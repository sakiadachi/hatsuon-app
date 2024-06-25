import { fetchApi } from "$lib/utils/fetchApi";
import { writable, type Writable } from "svelte/store";

export type RecordingType = {
  src: string;
  uuid: string;
  file: File;
};

const isRecording = writable(false);
const localRecordings: Writable<RecordingType[]> = writable([]);
const recordWithPhrase = writable(false);

const filterRecording = (
  recordings: RecordingType[],
  recording: RecordingType,
) => recordings.filter((r) => r.uuid !== recording.uuid);

/**
 * Save local recording to database as Take
 */
const saveRecording = (recording: RecordingType, phrase_id: string) => {
  const formData = new FormData();
  formData.append("recording", recording.file);
  formData.append("phrase", phrase_id);

  return fetchApi(`api/v1/takes/`, {
    method: "POST",
    body: formData,
  });
};

const resetState = () => {
  isRecording.set(false);
  localRecordings.set([]);
  recordWithPhrase.set(false);
};

export default {
  isRecording,
  localRecordings,
  recordWithPhrase,
  filterRecording,
  saveRecording,
  resetState,
};
