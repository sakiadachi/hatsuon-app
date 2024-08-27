<script lang="ts">
import { createEventDispatcher } from "svelte";
export let text: string;
// biome-ignore lint/style/useConst: <explanation>
export let type: "submit" | "reset" | "button" | undefined = undefined;
// biome-ignore lint/style/useConst: <explanation>
export let isDisabled: boolean | undefined = undefined;

const dispatch = createEventDispatcher();
</script>

<button
  {type}
  disabled={isDisabled}
  on:click={(e) => {
    dispatch("click", e);
  }}
  on:submit={(e) => {
    dispatch("submit", e);
  }}
  class="bg-blue-500 enabled:text-white disabled:bg-slate-300 disabled:text-slate-500 enabled:hover:bg-blue-500/80 py-4 px-6 rounded-lg"
  >{text}</button
>
