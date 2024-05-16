<script lang="ts">
  import type { Collection } from "../store/types/collection";
  import {Link} from "svelte-routing"
  export let collections: Collection[];
</script>

<ul class="w-full">
  {#each collections as c}
    <li class="hover:bg-slate-200 pl-4 py-1">
      <a href="/collection/{c.uuid}">{c.title}</a>
      <Link to="/collection"></Link>
    </li>
  {/each}
</ul>
