<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Collection from "./routes/collection/Collection.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/login/Login.svelte";
  import { fetchApi } from "./utils/fetchApi";
  import Logout from "./routes/logout/Logout.svelte";
  import PrivateRouteWrapper from "./components/PrivateRouteWrapper.svelte";
  import Header from "./components/Header.svelte"

  export let url = "";

  const logout = async () => {
    const result = await fetchApi(
      "api-auth/logout/",
      {
        method: "POST",
      },
      { "Content-Type": "application/json" },
    );
    if (result.ok) {
      navigate("/logout", { replace: true });
    }
  };
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
      <PrivateRouteWrapper path="/collection">
        <Collection />
      </PrivateRouteWrapper>
    </div>
  </Router>
</main>
