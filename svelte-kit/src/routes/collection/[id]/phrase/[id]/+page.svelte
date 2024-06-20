<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import { fetchApi } from "$lib/utils/fetchApi";
  import current_collection_store from "$lib/store/current_collection";
  import current_phease_store from "$lib/store/current_phrase_store";
  import useLocalRecordings from "./useLocalRecordings";
  import PhraseSection from "./sections/PhraseSection.svelte";
  import TakesSection from "./sections/TakesSection.svelte";
  import LocalRecordingSection from "./sections/LocalRecordingSection.svelte";
  import RecordingSection from "./sections/RecordingSection.svelte";

  export let data: PageData;
  const { phrase, takes } = data;

  const { current_collection } = current_collection_store;
  const {
    current_phrase,
    current_takes,
    phrase_id,
    fetchTakes,
    saveRecordingToPhrase,
    deleteTake,
  } = current_phease_store;
  const { local_recordings, filterRecording, saveRecording } =
    useLocalRecordings;

  let mediaRecorder: MediaRecorder | undefined = undefined;

  /**
   * Weather if recording start btn is enabled
   */
  let is_enabled_rec_start_btn = true;

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
          console.log("start");
          is_enabled_rec_start_btn = false;
        };

        mediaRecorder.onstop = (e) => {
          console.log("stop");

          if (mediaRecorder) {
            mediaRecorder.stop();
            is_enabled_rec_start_btn = true;

            const uid: string = uuid();
            const blob = new Blob(chunks, { type: "audio/mpeg" });
            const file = new File([blob], blob.name);
            chunks = [];
            const audio_url = window.URL.createObjectURL(blob);
            local_recordings.set([
              ...$local_recordings,
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

  const getCurrentCollection = async () => {
    const { pathname } = $page.url;
    const matched = pathname.match(
      "(?<=/collection/)([a-zA-Z0-9-]+)(?=/phrase/.*$)",
    );
    if (matched && matched.length > 0) {
      const result = await fetchApi(`api/v1/collections/${matched[0]}/`);
      if (result.ok) {
        const json = await result.json();
        current_collection.set(json);
      } else {
        goto("/", { replaceState: true });
      }
    }
  };

  const onInput = async (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    },
  ) => {
    if (e.currentTarget?.files?.[0] == null || $current_phrase == null) {
      return;
    }
    const result = await saveRecordingToPhrase(
      e.currentTarget.files[0],
      $current_phrase,
    );
    if (result) {
      current_phrase.set(result);
    }
  };

  const saveLocalRecording = async (r: RecordingType) => {
    if ($current_phrase == null || $current_phrase.id == null) {
      return;
    }
    const result = await saveRecording(r, $current_phrase.id);
    if (!result.ok) {
      alert("Failed to save recording. Please try again.");
      return;
    }
    await fetchTakes($current_phrase.id);
    local_recordings.set(filterRecording($local_recordings, r));
  };

  onMount(async () => {
    if (!$current_collection) {
      await getCurrentCollection();
    }
    current_phrase.set(phrase);
    current_takes.set(takes);
    setRecorder();
  });
</script>

<svelte:head>
  <title>Phrase</title>
  <meta name="description" content="Practice your phrase" />
</svelte:head>

<div class="flex flex-col place-content-between">
  <PhraseSection current_phrase={$current_phrase} callbackOnInput={onInput} />

  <div class="min-h-80 mt-8">
    <h2 class="text-xl">Your Takes</h2>
    <TakesSection
      current_takes={$current_takes}
      on:click-delete={(e) => {
        if (e.detail.take.uuid == null) return;
        deleteTake(e.detail.take.uuid, $phrase_id);
      }}
    />

    <h2 class="text-xl">Your Local Recordings</h2>
    <LocalRecordingSection
      recordings={$local_recordings}
      on:delete-recording={(e) => {
        local_recordings.set(
          filterRecording($local_recordings, e.detail.recording),
        );
      }}
      on:save-recording={(e) => {
        saveLocalRecording(e.detail.recording);
      }}
    />
  </div>

  <div class="flex justify-center gap-4 align-center slef-end">
    <RecordingSection
      {is_enabled_rec_start_btn}
      on:click={() => {
        if (!mediaRecorder) return;
        if (is_enabled_rec_start_btn) {
          mediaRecorder.start();
        } else {
          mediaRecorder.stop();
        }
      }}
    />
  </div>
</div>
