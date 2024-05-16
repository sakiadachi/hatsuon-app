<script lang="ts">
import { Link } from "svelte-routing";
import { beforeUpdate } from "svelte";
import auth_store from "../../store/auth_store.ts";

const { logout } = auth_store;

let isLoading: boolean = false;
let logoutSuccess: boolean = false;

beforeUpdate(async () => {
	isLoading = true;
	logoutSuccess = await logout();
	isLoading = false;
});
</script>

<div>
  {#if logoutSuccess}
    <p>You have successfully logged out.</p>
    <Link to="/login">Go to Login</Link>
  {/if}
</div>
