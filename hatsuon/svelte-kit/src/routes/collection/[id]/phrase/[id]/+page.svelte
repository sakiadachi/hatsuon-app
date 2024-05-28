<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import type { AudioSrc } from "./+page";
  import AudioVisualizer from "./AudioVisualizer.svelte";
  import Takes from "./Takes.svelte";

  export let data: PageData;
  const { phrase } = data;

  /**
   * Original phrase source from Input
   */
  let phraseSrc: AudioSrc | null = null;
  let mediaRecorder: MediaRecorder | undefined = undefined;
  /**
   * Recording sources
   */
  let recordings: AudioSrc[] = [];
  /**
   * Weather if recording start btn is enabled
   */
  let is_enabled_rec_start_btn = true;

  onMount(() => {
    if (!navigator.mediaDevices) {
      alert("getUserMedia not supported on your browser");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        let chunks: BlobPart[] = [];
        let recordingIndex = 0;

        mediaRecorder.onstart = (e) => {
          console.log("start");
          is_enabled_rec_start_btn = false;
        };

        mediaRecorder.onstop = (e) => {
          console.log("stop");

          if (mediaRecorder) {
            mediaRecorder.stop();
            is_enabled_rec_start_btn = true;

            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            const audio_url = window.URL.createObjectURL(blob);
            recordings = [
              ...recordings,
              {
                src: audio_url,
                name: `recording-${recordingIndex}`,
              },
            ];
            recordingIndex += 1;
          }
        };
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
      })
      .catch((err) => {
        console.error(err);
      });
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

  const onInput = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (e.currentTarget?.files?.[0] == null) {
      return;
    }
    phraseSrc = {
      src: window.URL.createObjectURL(e.currentTarget.files[0]),
      name: "phrase",
    } as AudioSrc;
  };
</script>

<svelte:head>
  <title>{phrase.title}</title>
  <meta name="description" content="Practice your phrase" />
</svelte:head>

<div class="flex flex-col place-content-between">
  <section class="">
    <h1 class="text-left">{phrase.title}</h1>
    <p class="mb-4">{phrase.description}</p>
  </section>
  <div class="flex flex-col">
    <input type="file" accept="audio/mp3,audio/wav" on:input={onInput} />
    {#if phraseSrc}
      <AudioVisualizer audioSrc={phraseSrc} />
    {/if}
    <div class="bg-slate-100 min-h-80 mt-8">
      <h2 class="text-xl mb-4">Your Takes</h2>
      {#if recordings.length > 0}
        <Takes takes={recordings} />
      {:else}
        <p class="text-center">You don't have recordings yet!</p>
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
          <span class="flex bg-red-600 rounded-full w-10 h-10 self-center"
          ></span>
        {:else}
          <span class="flex w-6 h-6 bg-red-600 rounded-sm self-center"></span>
        {/if}
      </button>
    </div>
  </div>
</div>
