<script lang="ts">
  import auth_store from "$lib/store/auth_store";
  import { onMount } from "svelte";

  export let data;

  const { isLoggedIn: loginState } = data;
  const { isLoggedIn } = auth_store;
  // set login state fetched in +layout.server.ts to auth_store (client side)
  isLoggedIn.set(JSON.stringify(loginState));
</script>

<slot />
