<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$lib/components/Button.svelte";
import { fetchApi } from "$lib/utils/fetchApi";

let title: string;
$: title = "";

let description: string;
$: description = "";
$: trimmedDescription = description.trim();

const add_collection = async () => {
  let newCollection = {
    title,
  } as EditCollectionType;

  if (trimmedDescription.length > 0) {
    newCollection = {
      ...newCollection,
      description: trimmedDescription,
    };
  }

  const result = await fetchApi(
    "api/v1/collections/",
    {
      method: "POST",
      body: JSON.stringify(newCollection),
    },
    { "Content-Type": "application/json" },
  );
  if (result.ok) {
    const json = (await result.json()) as Collection;
    goto(`/collection/${json.uuid}`);
  }
};
</script>

<div class="h-full">
  <form on:submit|preventDefault={add_collection} id="create-new-item-form">
    <fieldset class="flex flex-col gap-6">
      <legend class="d-flex justify-center w-full"
        ><h1 class="mb-12">Add Collection</h1></legend
      >
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <label for="collection-title" class="">Title:</label>
        <input
          type="text"
          id="collection-title"
          name="collection-title"
          bind:value={title}
          required
          maxlength="150"
          placeholder="JLPT N1 vocaburaly"
          class="border rounded max-h-12 p-2"
        />
      </div>

      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <label for="collection-description">Description: </label>
        <textarea
          id="collection-description"
          name="collection-description"
          bind:value={description}
          maxlength="300"
          placeholder="description"
          rows="5"
          class="border rounded p-2"
        />
      </div>
    </fieldset>

    <div class="flex justify-end col-span-3">
      <Button text="Submit" type="submit" />
    </div>
  </form>
</div>
