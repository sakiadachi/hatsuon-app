<script lang="ts">
  import { createEventDispatcher } from "svelte";
  /**
   * Component to show & play local audio files
   * recorded on the browser
   */
  import AudioVisualizer from "./AudioVisualizer.svelte";

  export let recordings: RecordingType[];
  let playWithOriginalRecording = false;

  const dispatch = createEventDispatcher();
</script>

<ul class="list-inside">
  {#each recordings as recording}
    <li class="mb-4">
      <div class="flex items-center justify-end">
        <div class="flex">
          <label class="p-1">
            <input bind:value={playWithOriginalRecording} type="checkbox" />
            Sync play
          </label>
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
