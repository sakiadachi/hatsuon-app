<script lang="ts">
import type { RecordingType } from "../hooks/useLocalRecordings";
import LocalTakes from "../LocalTakes.svelte";

export let recordings: RecordingType[];
</script>

{#if recordings.length > 0}
  <p class="mb-4">
    Click "Save" if you want to save your recoring to the database.
  </p>
  <LocalTakes {recordings} on:delete-recording on:save-recording />
{:else}
  <p class="text-center p-4">You don't have recordings yet!</p>
{/if}
