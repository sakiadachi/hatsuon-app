<script lang="ts">
export let text: string;
export let classStr: string;
export let title: string;
</script>

<button
  {title}
  class={`${classStr} flex justify-center align-center p-4 rounded-lg border-2 border-rose-500 hover:opacity-60 mx-auto font-semibold`}
  on:click
  >{text}
</button>
