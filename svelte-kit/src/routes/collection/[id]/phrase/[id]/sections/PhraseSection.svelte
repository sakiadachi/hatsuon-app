<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import AudioVisualizer from "../AudioVisualizer.svelte";

  export let current_phrase: Phrase | undefined;
  export let callbackOnInput: FormEventHandler<HTMLInputElement>;
</script>

<section class="">
  {#if current_phrase}
    <h1 class="text-left">{current_phrase.title}</h1>
    <p class="mb-4">{current_phrase.description}</p>

    <div class="flex flex-col">
      {#if current_phrase.recording}
        <AudioVisualizer audioSrc={current_phrase.recording} />
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
