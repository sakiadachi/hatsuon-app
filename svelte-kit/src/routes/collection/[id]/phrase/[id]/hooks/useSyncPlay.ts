import { writable, type Writable } from "svelte/store";

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#events
 */
export type SyncPlayState = {
  play: boolean;
  paused: boolean;
  ended: boolean;
};

/**
 *  Take Object with its recording states
 */
export interface ExtendedTake extends Take {
  /**
   * Audio element ref
   */
  audioEl?: HTMLAudioElement;
  duration: number;
  currentTime: number;
  timePos: number;
}

/**
 * List of Take's uuid to play simultaneously with the Phrase recording
 */
const syncPlayList: Writable<string[]> = writable([]);
/**
 * Player state of Phrase recording
 * Use this to play the take recordings simultaneously
 */
const syncPlayState: Writable<SyncPlayState> = writable({
  play: false,
  paused: false,
  ended: false,
});
/**
 * List of Takes with recording states
 */
const extendedTakes: Writable<ExtendedTake[]> = writable([]);

const onPlay = () => {
  syncPlayState.set({
    play: true,
    paused: false,
    ended: false,
  });
};
const onPause = () => {
  syncPlayState.set({
    play: false,
    paused: true,
    ended: false,
  });
};
const onEnded = () => {
  syncPlayState.set({
    play: false,
    paused: false,
    ended: true,
  });
};

const resetState = () => {
  syncPlayList.set([]);
  syncPlayState.set({
    play: false,
    paused: false,
    ended: false,
  });
  extendedTakes.set([]);
};

export default {
  syncPlayList,
  syncPlayState,
  extendedTakes,
  onPlay,
  onPause,
  onEnded,
  resetState,
};
