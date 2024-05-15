<script lang="ts">
  import { onMount } from "svelte";
  import { currentRoute, checkCurrentRoutePath } from "../store/router.ts";
  import { isLoggedIn } from "../store/login_store.js";
  import { navigate } from "svelte-routing";

  const loginRequiredRoutes = ["/", "/collection"];

  onMount(() => {
    checkCurrentRoutePath();
  });

  $: if (!$isLoggedIn && loginRequiredRoutes.includes($currentRoute)) {
    console.log("not logged in");
    navigate("/login", { replace: true });
  }
</script>

<slot />
