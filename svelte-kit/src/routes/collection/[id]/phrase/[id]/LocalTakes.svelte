<script lang="ts">
  /**
   * Component to show & play local audio files
   * recorded on the browser
   */
  import AudioVisualizer from "./AudioVisualizer.svelte";
  import PlayIcon from "$lib/images/hero_icons/PlayIcon.svelte";
  import { onMount } from "svelte";
  import { fetchApi } from "$lib/utils/fetchApi";

  export let takes: string[];
  let playWithOriginalRecording = false;

  const clickSave = () => {};
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
          <button on:click={clickSave} class="p-1">📓 Save</button>
          <button on:click={clickRemove} class="p-1">🗑️ Trash</button>
        </div>
      </div>
      <AudioVisualizer audioSrc={take} />
    </li>
  {/each}
</ul>
