<script lang="ts">
  import { Link } from "svelte-routing";
  import RouteWrapper from "../RouteWrapper.svelte";
</script>

<RouteWrapper>
  <div>
    <p>You have successfully logged out.</p>
    <Link to="/login">Go to Login</Link>
  </div>
</RouteWrapper>
