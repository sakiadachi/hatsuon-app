<script lang="ts">
  import AudioVisualizer from "../AudioVisualizer.svelte";
  import { createEventDispatcher } from "svelte";

  export let current_takes: Take[];

  const dispatch = createEventDispatcher();
  let sync_play_list: string[];
</script>

{#if current_takes.length > 0}
  <ul class="list-inside">
    {#each current_takes as take}
      <li class="mb-4">
        <div class="flex items-center justify-end">
          <div class="flex">
            <label class="p-1">
              <input
                type="checkbox"
                bind:group={sync_play_list}
                value={take.uuid}
              />
              Sync play
            </label>
            <button on:click={() => dispatch("click-delete", take)} class="p-1"
              >🗑️ Delete</button
            >
          </div>
        </div>
        <AudioVisualizer audioSrc={take.recording || ""} />
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-center p-4">You don't have takes yet!</p>
{/if}
