<script lang="ts">
  import type { Collection } from "../store/types/collection";
  import { Link } from "svelte-routing";
  export let collections: Collection[];
</script>

<ul class="flex flex-col">
  {#each collections as c}
    <li class="hover:bg-slate-200 pl-4 py-1">
      <Link to="/collection/{c.uuid}">{c.title}</Link>
    </li>
  {/each}
</ul>
