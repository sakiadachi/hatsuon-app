<script lang="ts">
  import { fetchApi } from "$lib/utils/fetchApi";
  /**
   * Component to show & play audio files
   * fetched from database
   */
  import AudioVisualizer from "./AudioVisualizer.svelte";

  export let takes: Take[];
  let playWithOriginalRecording = false;

  const clickRemove = () => {};
</script>

<ul class="list-inside">
  {#each takes as take}
    <li class="mb-4">
      <div class="flex items-center justify-end">
        <div class="flex">
          <label class="p-1">
            <input bind:value={playWithOriginalRecording} type="checkbox" />
            Sync play
          </label>
          <button on:click={clickRemove} class="p-1">🗑️ Remove</button>
        </div>
      </div>
      <AudioVisualizer audioSrc={take.recording || ""} />
    </li>
  {/each}
</ul>
