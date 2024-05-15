<script lang="ts">
  import type { Collection } from "../store/types/collection";
  export let collections: Pick<Collection, "title" | "id">[];
</script>

<ul class="w-full">
  {#each collections as c}
    <li class="hover:bg-slate-200 pl-4 py-1">
      <a href="/collection/{c.id}">{c.title}</a>
    </li>
  {/each}
</ul>
