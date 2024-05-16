<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Collection from "./routes/collection/Collection.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/login/Login.svelte";
  import Logout from "./routes/logout/Logout.svelte";
  import PrivateRouteWrapper from "./components/PrivateRouteWrapper.svelte";
  import Header from "./components/Header.svelte";

  export let url = "";
</script>

<main class="h-screen w-full">
  <Router {url}>
    <nav>
      <Header />
    </nav>
    <div>
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <PrivateRouteWrapper path="/">
        <Home />
      </PrivateRouteWrapper>
      <PrivateRouteWrapper path="/collection/:id" let:params>
        <slot for="child"><Collection {params} /></slot>
      </PrivateRouteWrapper>
    </div>
  </Router>
</main>
