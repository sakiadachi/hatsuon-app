import type { RecordingType } from "./useLocalRecordings";

const checkMicPermission = (): Promise<MediaStream> =>
  new Promise((resolve, reject) =>
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        resolve(stream);
      })

      .catch((error) => {
        // Exception type
        // https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia#%E4%BE%8B%E5%A4%96
        alert(
          "To use the recording feature, please enable microphone access in your browser settings.",
        );
        reject(error);
      }),
  );

const onStop = (chunks: BlobPart[], uid: string): RecordingType => {
  const blob = new Blob(chunks, { type: "audio/mpeg" });
  const file = new File([blob], uid);
  const audio_url = window.URL.createObjectURL(blob);
  return {
    src: audio_url,
    uuid: uid,
    file: file,
  } as RecordingType;
};

export default {
  checkMicPermission,
  onStop,
};
