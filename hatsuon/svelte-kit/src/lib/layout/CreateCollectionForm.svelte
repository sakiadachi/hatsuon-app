<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  export let pageTitle: string;
</script>

<div class="h-full">
  <form id="create-new-item-form" action="">
    <fieldset class="flex flex-col gap-6">
      <legend class="d-flex justify-center w-full"
        ><h1 class="mb-12">{pageTitle}</h1></legend
      >
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <slot name="form-row-1--label" />
        <slot name="form-row-1--input" />
      </div>
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <slot name="form-row-2--label" />
        <slot name="form-row-2--input" />
      </div>
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <slot name="form-row-3--label" />
        <slot name="form-row-3--input" />
      </div>
    </fieldset>

    <div class="flex justify-end col-span-3">
      <Button text="Submit" type="button" on:click />
    </div>
  </form>
</div>
