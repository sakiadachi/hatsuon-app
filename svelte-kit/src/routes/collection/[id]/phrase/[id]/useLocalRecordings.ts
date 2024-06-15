import { fetchApi } from "$lib/utils/fetchApi";

const filterRecording = (
  recordings: RecordingType[],
  recording: RecordingType,
) => recordings.filter((r) => r.uuid !== recording.uuid);

/**
 * Save local recording to database as Take
 * @param recording
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

export default {
  filterRecording,
  saveRecording,
};