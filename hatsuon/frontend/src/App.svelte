<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Collection from "./routes/collection/Collection.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/login/Login.svelte";
  import Logout from "./routes/logout/Logout.svelte";
  import PrivateRouteWrapper from "./components/PrivateRouteWrapper.svelte";
  import Header from "./components/Header.svelte";
  import { type RouteParams } from "vue-router";

  export let url = "";
</script>

<main class="h-screen w-full">
  <Router {url}>
    <Header />
    <div class="w-full max-w-screen-sm mx-auto">
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <PrivateRouteWrapper path="/">
        <slot><Home /></slot>
      </PrivateRouteWrapper>
      <PrivateRouteWrapper path="/collection/:id" let:params>
        <slot><Collection {params} /></slot>
      </PrivateRouteWrapper>
    </div>
  </Router>
</main>
