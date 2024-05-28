<script lang="ts">
  import { beforeUpdate } from "svelte";
  import auth_store from "$lib/store/auth_store";

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
  {#if isLoading}
    <p>Loading...</p>
  {/if}
  {#if logoutSuccess}
    <p>You have successfully logged out.</p>
    <a href="/login">Go to Login</a>
  {/if}
</div>
