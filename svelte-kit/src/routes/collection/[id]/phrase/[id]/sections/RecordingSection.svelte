<script lang="ts">
  export let is_enabled_rec_start_btn: boolean;
</script>

<button
  title="{is_enabled_rec_start_btn ? 'Start' : 'Stop'} Recording"
  class="flex justify-center align-center w-14 h-14 rounded-full border-2 border-red-600 hover:opacity-60"
  on:click
>
  {#if is_enabled_rec_start_btn}
    <span class="flex bg-red-600 rounded-full w-10 h-10 self-center"></span>
  {:else}
    <span class="flex w-6 h-6 bg-red-600 rounded-sm self-center"></span>
  {/if}
</button>
