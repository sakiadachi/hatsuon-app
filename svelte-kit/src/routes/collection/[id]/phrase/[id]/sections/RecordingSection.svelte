<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";

  export let isRecording: boolean;
  /**
   * Weather play phrase audio when recording.
   */
  export let playingWithOriginalRec: boolean;
  export let callbackOnChange: ChangeEventHandler<HTMLInputElement>;
</script>

<button
  title="{isRecording ? 'Stop' : 'Start'} Recording"
  class="flex justify-center align-center w-14 h-14 rounded-full border-2 border-red-600 hover:opacity-60 mx-auto"
  on:click
>
  {#if isRecording}
    <span class="flex w-6 h-6 bg-red-600 rounded-sm self-center"></span>
  {:else}
    <span class="flex bg-red-600 rounded-full w-10 h-10 self-center"></span>
  {/if}
</button>
<label class="mx-auto">
  <input
    type="checkbox"
    bind:checked={playingWithOriginalRec}
    on:change={callbackOnChange}
    class="mr-4"
  />Play Phrase
</label>
