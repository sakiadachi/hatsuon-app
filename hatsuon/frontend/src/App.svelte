<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import Collection from "./routes/collection/Collection.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/login/Login.svelte";
  import { fetchApi } from "./utils/fetchApi";
  import Logout from "./routes/logout/Logout.svelte";

  export let url = "";

  const logout = async () => {
    const result = await fetchApi(
      "api-auth/logout/",
      {
        method: "POST",
      },
      { "Content-Type": "application/json" }
    );
    if (result.ok) {
      navigate("/logout", { replace: true });
    }
  };
</script>

<main class="h-screen">
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">login</Link>
      <Link to="/collection">Collection</Link>

      <button on:click={logout}>Log out</button>
    </nav>
    <div>
      <Route path="/logout" component={Logout} />
      <Route path="/collection" component={Collection} />
      <Route path="/login" component={Login} />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</main>
