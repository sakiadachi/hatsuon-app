<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { v4 as uuid } from "uuid";
  import currentPhraseStore from "$lib/store/currentPhraseStore";
  import useLocalRecordings from "./hooks/useLocalRecordings.ts";
  import PhraseSection from "./sections/PhraseSection.svelte";
  import TakesSection from "./sections/TakesSection.svelte";
  import LocalRecordingSection from "./sections/LocalRecordingSection.svelte";
  import RecordingSection from "./sections/RecordingSection.svelte";
  import useSyncPlay from "./hooks/useSyncPlay";

  const {
    currentPhrase,
    curentTakes,
    phraseId,
    fetchTakes,
    saveRecordingToPhrase,
    deleteTake,
  } = currentPhraseStore;

  const {
    isRecording,
    localRecordings,
    filterRecording,
    saveRecording,
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

  const setRecorder = async () => {
    if (!navigator.mediaDevices) {
      alert("getUserMedia not supported on your browser");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        let chunks: BlobPart[] = [];

        mediaRecorder.onstart = (e) => {
          console.debug("start");
          isRecording.set(true);
        };

        mediaRecorder.onstop = (e) => {
          console.debug("stop");

          if (mediaRecorder) {
            mediaRecorder.stop();
            isRecording.set(false);

            const uid: string = uuid();
            const blob = new Blob(chunks, { type: "audio/mpeg" });
            const file = new File([blob], blob.name);
            chunks = [];
            const audio_url = window.URL.createObjectURL(blob);
            localRecordings.set([
              ...$localRecordings,
              {
                src: audio_url,
                uuid: uid,
                file: file,
              } as RecordingType,
            ]);
          }
        };
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveLocalRecording = async (r: RecordingType) => {
    if ($phraseId == null) {
      return;
    }
    const result = await saveRecording(r, $phraseId);
    if (!result.ok) {
      alert("Failed to save recording. Please try again.");
      return;
    }
    await fetchTakes($phraseId);
    localRecordings.set(filterRecording($localRecordings, r));
  };

  onMount(async () => {
    setRecorder();
  });

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
      currentTakes={$curentTakes}
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
      on:save-recording={(e) => {
        saveLocalRecording(e.detail.recording);
      }}
    />
  </div>

  <div class="flex justify-center gap-4 align-center slef-end">
    <RecordingSection
      isRecording={$isRecording}
      on:click={() => {
        if (!mediaRecorder) return;
        if ($isRecording) {
          mediaRecorder.stop();
        } else {
          mediaRecorder.start();
        }
      }}
    />
  </div>
</div>
