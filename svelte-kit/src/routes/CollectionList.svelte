<script lang="ts">
  export let collections: Collection[];
</script>

<ul class="w-full">
  {#each collections as c (c.uuid)}
    <li class="hover:bg-slate-200 pl-4 py-1">
      <a href="/collection/{c.uuid}">{c.title}</a>
    </li>
  {/each}
</ul>
