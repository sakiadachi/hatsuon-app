<script lang="ts">
import type { ChangeEventHandler } from "svelte/elements";
import { createEventDispatcher } from "svelte";
import RecordingButton from "../components/RecordingButton.svelte";

export let isRecording: boolean;
/**
 * Weather play phrase audio when recording.
 */
export let playingWithOriginalRec: boolean;
export let callbackOnChange: ChangeEventHandler<HTMLInputElement>;

const dispatch = createEventDispatcher();
</script>

{#if isRecording}
  <RecordingButton
    title="Stop Recording"
    classStr="text-rose-500"
    text="Stop"
    on:click={() => {
      dispatch("stop-recording");
    }}
  />
{:else}
  <RecordingButton
    title="Start Recording"
    classStr="bg-rose-500  text-white"
    text="Rec"
    on:click={() => {
      dispatch("start-recording");
    }}
  />
{/if}

<label class="mx-auto">
  <input
    type="checkbox"
    bind:checked={playingWithOriginalRec}
    on:change={callbackOnChange}
    class="mr-4"
  />Play Phrase
</label>
