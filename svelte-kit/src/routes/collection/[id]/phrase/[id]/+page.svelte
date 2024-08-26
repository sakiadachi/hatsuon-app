<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { onDestroy } from "svelte";
import currentPhraseStore from "$lib/store/currentPhraseStore";
import useLocalRecordings from "./hooks/useLocalRecordings";
import PhraseSection from "./sections/PhraseSection.svelte";
import TakesSection from "./sections/TakesSection.svelte";
import LocalRecordingSection from "./sections/LocalRecordingSection.svelte";
import RecordingSection from "./sections/RecordingSection.svelte";
import useSyncPlay from "./hooks/useSyncPlay";
import useMediaRecorder from "./hooks/useMediaRecorder";

const {
  currentPhrase,
  currentTakes,
  phraseId,
  fetchTakesWithPhraseUuid,
  saveRecordingToPhrase,
  deleteTake,
} = currentPhraseStore;

const {
  localRecordings,
  recordWithPhrase,
  filterRecording,
  saveRecording: saveLocalRecording,
  resetState: resetLocalRecState,
} = useLocalRecordings;

const {
  syncPlayState,
  onPlay,
  onPause,
  onEnded,
  resetState: resetSyncPlayState,
} = useSyncPlay;

let mediaRecorder: MediaRecorder | undefined = undefined;
let chunks: BlobPart[] = [];
let isRecording = false;

const handleMediaRecorder = () => {
  if (mediaRecorder == null) {
    return;
  }
  mediaRecorder.onstart = () => {
    console.debug("start");
    isRecording = true;
  };
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = (e) => {
    console.debug("stop");
    isRecording = false;
    const uid = uuidv4();
    if (mediaRecorder) {
      const result = useMediaRecorder.onStop(chunks, uid);
      // add a new recording to local rec list
      localRecordings.set([...$localRecordings, result]);
      // clear chunks
      chunks = [];
    }
  };
};

const startRecording = async () => {
  const stream = await useMediaRecorder.checkMicPermission();
  if (stream == null) {
    mediaRecorder = undefined;
    return;
  }
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  isRecording = true;
  handleMediaRecorder();
};

onDestroy(() => {
  resetLocalRecState();
  resetSyncPlayState();
});
</script>

<svelte:head>
  <title>Phrase</title>
  <meta name="description" content="Practice your phrase" />
</svelte:head>

<div class="flex flex-col place-content-between">
  <PhraseSection
    currentPhrase={$currentPhrase}
    recordWithPhrase={$recordWithPhrase && isRecording}
    {onPlay}
    {onPause}
    {onEnded}
    callbackOnInput={async (e) => {
      if (e.currentTarget?.files?.[0] == null || $currentPhrase == null) {
        return;
      }
      const result = await saveRecordingToPhrase(
        e.currentTarget.files[0],
        $currentPhrase,
      );
      if (result) {
        currentPhrase.set(result);
      }
    }}
  />
  <div class="min-h-80 mt-8">
    <h2 class="text-xl">Your Takes</h2>
    <TakesSection
      currentTakes={$currentTakes}
      syncPlayState={$syncPlayState}
      on:click-delete={(e) => {
        if (e.detail.take.uuid == null) return;
        deleteTake(e.detail.take.uuid, $phraseId);
      }}
    />
    <h2 class="text-xl">Your Local Recordings</h2>
    <LocalRecordingSection
      recordings={$localRecordings}
      on:delete-recording={(e) => {
        localRecordings.set(
          filterRecording($localRecordings, e.detail.recording),
        );
      }}
      on:save-recording={async (e) => {
        const r = e.detail.recording;
        if ($currentPhrase?.id == null || $phraseId == null) {
          return;
        }
        const result = await saveLocalRecording(r, $currentPhrase.id);
        if (!result.ok) {
          alert("Failed to save recording. Please try again.");
          return;
        }
        await fetchTakesWithPhraseUuid($phraseId);
        localRecordings.set(filterRecording($localRecordings, r));
      }}
    />
  </div>
  <div class="flex flex-col justify-center gap-4 align-center slef-end">
    <RecordingSection
      {isRecording}
      playingWithOriginalRec={$recordWithPhrase}
      callbackOnChange={(e) => {
        if (e.currentTarget == null) return;
        recordWithPhrase.set(e.currentTarget.checked);
      }}
      on:start-recording={() => {
        startRecording();
      }}
      on:stop-recording={() => {
        if (mediaRecorder) {
          mediaRecorder.stop();
        }
      }}
    />
  </div>
</div>
