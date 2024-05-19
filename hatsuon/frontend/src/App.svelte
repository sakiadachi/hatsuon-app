<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Collections from "./routes/collections/Collections.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/login/Login.svelte";
  import Logout from "./routes/logout/Logout.svelte";
  import PrivateRouteWrapper from "./components/PrivateRouteWrapper.svelte";
  import Header from "./components/Header.svelte";
  import { type RouteParams } from "vue-router";
  import Phrase from "./routes/collections/phrase/Phrase.svelte";

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
      <PrivateRouteWrapper path="/collections/:id" let:params>
        <slot><Collections {params} /></slot>
      </PrivateRouteWrapper>
      <PrivateRouteWrapper path="/collections/:id/phrase/:p_id" let:params>
        <slot><Phrase {params} /></slot>
      </PrivateRouteWrapper>
    </div>
  </Router>
</main>
