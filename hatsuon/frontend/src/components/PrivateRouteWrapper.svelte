<script lang="ts">
/**
 * Wrapper for the page requires authentication
 */
import { Route } from "svelte-routing";
import PrivateGuard from "./PrivateGuard.svelte";
import Collection from "../routes/collection/Collection.svelte";
export let path;
</script>

<Route path={path} let:params>
  <PrivateGuard>
    <slot :name="child" {params} />
  </PrivateGuard>  
</Route>
