<script lang="ts">
  import { beforeUpdate } from "svelte";
  import {
    currentRoute,
    checkRoute,
    type currentRouteType,
  } from "../store/router";
  import auth_store from "../store/auth_store";
  import { navigate, useLocation } from "svelte-routing";

  let location;
  const { isLoggedIn, checkHasAuthenticated } = auth_store;

  beforeUpdate(async () => {
    console.log("before update");
    // Check current route
    location = useLocation();
    const newRouteName = checkRoute($location.pathname);
    currentRoute.set(newRouteName);
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
