<script lang="ts">
  /**
   * Component to show & play audio files
   * fetched from database
   */
  import AudioVisualizer from "./AudioVisualizer.svelte";
  import current_phrase_store from "$lib/store/current_phrase_store";

  export let takes: Take[];
  const { phrase_id, deleteTake } = current_phrase_store;
  let playWithOriginalRecording = false;

  const clickDelete = async (take: Take) => {
    await deleteTake(take.uuid ?? "", $phrase_id);
  };
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
          <button on:click={() => clickDelete(take)} class="p-1"
            >🗑️ Delete</button
          >
        </div>
      </div>
      <AudioVisualizer audioSrc={take.recording || ""} />
    </li>
  {/each}
</ul>
