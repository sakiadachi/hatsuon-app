<script lang="ts">
// TODO: sync play function
import { createEventDispatcher } from "svelte";
import AudioVisualizer from "./AudioVisualizer.svelte";
import type { RecordingType } from "./hooks/useLocalRecordings";

export let recordings: RecordingType[];

const dispatch = createEventDispatcher();
</script>

<ul class="list-inside">
  {#each recordings as recording (recording.uuid)}
    <li class="mb-4">
      <div class="flex items-center justify-end">
        <div class="flex">
          <!-- <label class="p-1">
            <input bind:value={playWithOriginalRecording} type="checkbox" />
            Sync play
          </label> -->
          <button
            on:click={() =>
              dispatch("save-recording", { recording: recording })}
            class="p-1">📓 Save</button
          >
          <button
            on:click={() =>
              dispatch("delete-recording", { recording: recording })}
            class="p-1">🗑️ Trash</button
          >
        </div>
      </div>
      <AudioVisualizer audioSrc={recording.src} />
    </li>
  {/each}
</ul>
