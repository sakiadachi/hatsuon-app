<script lang="ts">
  import  {Router, Link, Route} from "svelte-routing"
  import Collection from "./routes/collection/Collection.svelte"
  import Home from "./routes/Home.svelte"
  import Login from "./routes/login/Login.svelte"

  export let url = "";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">login</Link>
      <Link to="/collection">Collection</Link>
    </nav>
    <div>
      <Route path="/collection" component={Collection} />
      <Route path="/login" component={Login} />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
</main>
