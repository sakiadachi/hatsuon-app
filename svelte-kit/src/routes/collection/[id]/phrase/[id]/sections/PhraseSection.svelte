<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import AudioCanvas from "./AudioCanvas.svelte";

  export let current_phrase: Phrase | undefined;
  export let callbackOnInput: FormEventHandler<HTMLInputElement>;
  export let onPlay;
  export let onPause;
  export let onEnded;

  let audioEl: HTMLAudioElement;

  let containerWidth: number;
  let duration: number | undefined;
  let currentTime: number;

  let timePos: number;
  $: timePos = 0;
  // TODO: Make reusable state generator

  const moveCurrentTimeIndicator = (
    e: Event & {
      currentTarget: EventTarget & HTMLAudioElement;
    },
  ) => {
    if (duration === undefined) {
      throw new Error("Expected audioDuration");
    }
    const percent = currentTime / duration;
    timePos = Math.floor(containerWidth * percent);
  };
</script>

<section class="">
  {#if current_phrase}
    <h1 class="text-left">{current_phrase.title}</h1>
    <p class="mb-4">{current_phrase.description}</p>

    <div class="flex flex-col">
      {#if current_phrase.recording}
        <div bind:clientWidth={containerWidth} class="relative">
          <AudioCanvas
            recording={current_phrase.recording}
            w={containerWidth}
            h={150}
          />
          <span
            class="absolute w-[2px] h-[150px] top-0 bg-orange-500"
            style="left:{timePos}px"
          ></span>
          <audio
            src={current_phrase.recording}
            bind:this={audioEl}
            bind:currentTime
            bind:duration
            on:timeupdate={moveCurrentTimeIndicator}
            on:play={onPlay}
            on:pause={onPause}
            on:ended={onEnded}
            class="w-full"
            controls
          />
        </div>
      {:else}
        <input
          type="file"
          accept="audio/mp3,audio/wav,audio/m4a"
          on:input={callbackOnInput}
        />
      {/if}
    </div>
  {:else}
    <p>No such phrase!</p>
  {/if}
</section>
