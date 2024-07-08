<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  $: if ($page.status === 403) {
    goto("/login", { replaceState: true });
  }
</script>

<h1>{$page.status} {$page.error?.message ?? ""}</h1>
