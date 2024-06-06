<script lang="ts">
  import Header from "$lib/components/Header.svelte";
</script>

<div class="app flex flex-col min-h-screen">
  <Header />
  <main
    class="flex-1 flex flex-col p-4 w-full max-w-screen-sm my-0 mx-auto box-border"
  >
    <slot />
  </main>

  <footer class="flex flex-col justify-center items-center p-4">
    <p>
      <a href="mailto:hello@sakiadachi.com" class="text-black"
        >Any comments? Send an email to the maintainer.</a
      >
    </p>
  </footer>
</div>
