<script lang="ts">
  import { visualizeAudio } from "../hooks/useAudioVisualizer";

  export let recording: string | undefined;
  export let w: number;
  export let h: number;

  let canvas: HTMLCanvasElement;

  $: {
    if (canvas && w && recording) {
      canvas.width = w;
      canvas.height = h;
      visualizeAudio(canvas, recording);
    }
  }
</script>

<canvas bind:this={canvas}></canvas>
