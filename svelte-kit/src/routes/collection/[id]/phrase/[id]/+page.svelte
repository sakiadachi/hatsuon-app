<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import AudioVisualizer from "./AudioVisualizer.svelte";
  import Takes from "./Takes.svelte";
  import LocalTakes from "./LocalTakes.svelte";
  import { fetchApi } from "$lib/utils/fetchApi";
  import current_collection_store from "$lib/store/current_collection";
  import current_phease_store from "$lib/store/current_phrase_store";
  import useLocalRecordings from "./useLocalRecordings";

  export let data: PageData;
  const { phrase, takes } = data;

  const { current_collection } = current_collection_store;
  const { current_phrase, current_takes, fetchTakes, saveRecordingToPhrase } =
    current_phease_store;
  const { filterRecording, saveRecording } = useLocalRecordings;

  /**
   * Original phrase source from Input
   */
  let phraseSrc: string | null = null;
  let mediaRecorder: MediaRecorder | undefined = undefined;
  /**
   * Recording sources
   */
  let recordings: RecordingType[] = [];
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
            const file = new File([blob], uid);
            chunks = [];
            const audio_url = window.URL.createObjectURL(blob);
            recordings = [
              ...recordings,
              {
                src: audio_url,
                uuid: uid,
                file: file,
              } as RecordingType,
            ];
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

  onMount(async () => {
    if (!$current_collection) {
      await getCurrentCollection();
    }
    current_phrase.set(phrase);
    current_takes.set(takes);
    setRecorder();
  });

  const startRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
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

  const deleteLocalRecording = (r: RecordingType) => {
    recordings = filterRecording(recordings, r);
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
    recordings = filterRecording(recordings, r);
  };
</script>

<svelte:head>
  <title>Phrase</title>
  <meta name="description" content="Practice your phrase" />
</svelte:head>

<div class="flex flex-col place-content-between">
  {#if $current_phrase}
    <section class="">
      <h1 class="text-left">{$current_phrase.title}</h1>
      <p class="mb-4">{$current_phrase.description}</p>
    </section>
    <div class="flex flex-col">
      {#if $current_phrase.recording}
        <AudioVisualizer audioSrc={$current_phrase.recording} />
      {:else}
        <input
          type="file"
          accept="audio/mp3,audio/wav,audio/m4a"
          on:input={onInput}
        />
      {/if}
    </div>
  {:else}
    <p>No such phrase!</p>
  {/if}
  <div class="min-h-80 mt-8">
    <h2 class="text-xl">Your Takes</h2>
    {#if $current_takes.length > 0}
      <Takes takes={$current_takes} />
    {:else}
      <p class="text-center p-4">You don't have takes yet!</p>
    {/if}
    <h2 class="text-xl">Your Local Recordings</h2>
    {#if recordings.length > 0}
      <p class="mb-4">
        Click "Save" if you want to save your recoring to the database.
      </p>
      <LocalTakes
        {recordings}
        on:delete-recording={(e) => deleteLocalRecording(e.detail.recording)}
        on:save-recording={(e) => {
          saveLocalRecording(e.detail.recording);
        }}
      />
    {:else}
      <p class="text-center p-4">You don't have recordings yet!</p>
    {/if}
  </div>

  <div class="flex justify-center gap-4 align-center slef-end">
    <button
      title="{is_enabled_rec_start_btn ? 'Start' : 'Stop'} Recording"
      class="flex justify-center align-center w-14 h-14 rounded-full border-2 border-red-600 hover:opacity-60"
      on:click={(e) => {
        if (is_enabled_rec_start_btn) {
          startRecording();
        } else {
          stopRecording();
        }
      }}
    >
      {#if is_enabled_rec_start_btn}
        <span class="flex bg-red-600 rounded-full w-10 h-10 self-center"></span>
      {:else}
        <span class="flex w-6 h-6 bg-red-600 rounded-sm self-center"></span>
      {/if}
    </button>
  </div>
</div>
