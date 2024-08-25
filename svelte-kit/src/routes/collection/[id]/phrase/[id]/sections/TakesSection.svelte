<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import AudioCanvas from "./AudioCanvas.svelte";
  import type { ExtendedTake, SyncPlayState } from "../hooks/useSyncPlay";
  import useSyncPlay from "../hooks/useSyncPlay";

  export let currentTakes: Take[];
  export let syncPlayState: SyncPlayState;

  let syncPlayList: HTMLAudioElement[];
  $: syncPlayList = [];

  let containerWidth: number;
  const { extendedTakes } = useSyncPlay;

  $: if (syncPlayState && syncPlayList.length) {
    console.debug(syncPlayState, syncPlayList);
    if (syncPlayState.play) {
      syncPlayList.forEach((audioNode: HTMLAudioElement) => audioNode.play());
    } else if (syncPlayState.paused) {
      syncPlayList.forEach((audioNode: HTMLAudioElement) => audioNode.pause());
    } else if (syncPlayState.ended) {
      syncPlayList.forEach((audioNode: HTMLAudioElement) => audioNode.pause());
    }
  }

  const onTimeUpdate = (
    e: Event & {
      currentTarget: EventTarget & HTMLAudioElement;
    },
    take: ExtendedTake,
  ) => {
    // TODO: Fix timebar in Takes
    take.currentTime = e.currentTarget.currentTime;
    take.duration = e.currentTarget.duration;
    const percent = take.currentTime / take.duration;
    take.timePos = Math.floor(containerWidth * percent);
  };

  const bindEl = (node: HTMLAudioElement, take: ExtendedTake) => {
    take.audioEl = node;
  };

  const dispatch = createEventDispatcher();
  $: if (currentTakes) {
    extendedTakes.set(
      currentTakes.map(
        (take) =>
          ({
            ...take,
            audioEl: undefined,
            duration: 0,
            currentTime: 0,
            timePos: 0,
          }) as ExtendedTake,
      ),
    );
  }
</script>

{#if $extendedTakes.length > 0}
  <ul class="list-inside">
    {#each $extendedTakes as take (take.uuid)}
      <li class="mb-4">
        <div class="flex items-center justify-end">
          <div class="flex">
            <label class="p-1">
              <input
                type="checkbox"
                bind:group={syncPlayList}
                value={take.audioEl}
              />
              Sync play
            </label>
            <button
              on:click={() => dispatch("click-delete", { take })}
              class="p-1">🗑️ Delete</button
            >
          </div>
        </div>
        <div bind:clientWidth={containerWidth} class="relative">
          <AudioCanvas recording={take.recording} w={containerWidth} h={150} />
          <!-- <span
            class="absolute w-[2px] h-[150px] top-0 bg-orange-500"
            style="left:{take.timePos}px"
          ></span> -->

          <audio
            src={take.recording}
            bind:duration={take.duration}
            on:timeupdate={(e) => onTimeUpdate(e, take)}
            use:bindEl={take}
            class="w-full"
            controls
          />
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-center p-4">You don't have takes yet!</p>
{/if}
