<script lang="ts">
  import { beforeUpdate } from "svelte";
  import { currentRoute } from "../store/router";
  import auth_store from "../store/auth_store";
  import { navigate, useLocation } from "svelte-routing";

  let location;
  const { isLoggedIn, checkHasAuthenticated } = auth_store;

  beforeUpdate(async () => {
    console.log("before update");
    // Check current route
    location = useLocation();
    currentRoute.set($location.pathname);
    // Check auth state
    await checkHasAuthenticated();
    if (!$isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }
    console.log($currentRoute);
  });
</script>

<slot />
