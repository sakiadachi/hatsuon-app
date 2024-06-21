import { writable, type Writable } from "svelte/store";

export type SyncPlayState = {
  play: boolean;
  paused: boolean;
  ended: boolean;
};

export interface ExtendedTake extends Take {
  audioEl?: HTMLAudioElement;
  duration: number;
  currentTime: number;
  timePos: number;
}

const syncPlayList: Writable<string[]> = writable([]);

const audioNodes: Writable<HTMLAudioElement[]> = writable([]);

const syncPlayState: Writable<SyncPlayState> = writable({
  play: false,
  paused: false,
  ended: false,
});

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
export default {
  syncPlayList,
  audioNodes,
  syncPlayState,
  extendedTakes,
  onPlay,
  onPause,
  onEnded,
};
