<script lang="ts">
  import type { AudioSrc } from "./+page";
  import AudioVisualizer from "./AudioVisualizer.svelte";
  export let takes: AudioSrc[];
</script>

<ul class="list-disc list-inside">
  {#each takes as take}
    <li class="mb-4">
      <span>{take.name}</span>
      <AudioVisualizer audioSrc={{ src: take.src, name: take.name }} />
    </li>
  {/each}
</ul>
