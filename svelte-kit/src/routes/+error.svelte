<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    if ($page.status === 403) {
      goto("/login", { replaceState: true });
    }
  });
</script>

<h1>{$page.status} {$page.error?.message ?? ""}</h1>
