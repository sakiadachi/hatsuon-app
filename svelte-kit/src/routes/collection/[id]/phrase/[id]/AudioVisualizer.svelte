<script lang="ts">
import { visualizeAudio } from "./hooks/useAudioVisualizer";
export let audioSrc: string;

let container: HTMLDivElement | undefined;
let containerWidth: number;
let canvas: HTMLCanvasElement | undefined;

let timePos: number;
$: timePos = 0;
let audioDuration: number | undefined;
$: {
  if (canvas === undefined) {
    console.debug("canvas was undefined");
  } else {
    visualizeAudio(canvas, audioSrc).then((r) => {
      audioDuration = r.audioDuration;
    });
  }
}
$: {
  if (container === undefined || canvas === undefined) {
    console.debug("container was undefined");
  } else {
    containerWidth = container.clientWidth;
    canvas.width = containerWidth;
  }
}

const moveCurrentTimeIndicator = (
  e: Event & {
    currentTarget: EventTarget & HTMLAudioElement;
  },
) => {
  if (audioDuration === undefined) {
    throw new Error("Expected audioDuration");
  }
  // @ts-ignore-next-line
  const currentTime = e?.target?.currentTime || 0;
  const percent = currentTime / audioDuration;
  timePos = Math.floor(containerWidth * percent);
};
</script>

<div bind:this={container} class="relative">
  <canvas bind:this={canvas} height="150"></canvas>
  <!-- <span
    class="absolute w-[2px] h-[150px] top-0 bg-orange-500"
    style="left:{timePos}px"
  ></span> -->
  <audio
    src={audioSrc}
    controls
    style="width:{containerWidth}px"
    on:timeupdate={moveCurrentTimeIndicator}
  />
</div>
