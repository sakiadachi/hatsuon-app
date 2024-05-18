<script lang="ts">
  /**
   * Wrapper for the page requires authentication
   */
  import { Route } from "svelte-routing";
  import PrivateGuard from "./PrivateGuard.svelte";

  export let path;
</script>

<Route {path} let:params>
  <PrivateGuard>
    <slot {params} />
  </PrivateGuard>
</Route>
