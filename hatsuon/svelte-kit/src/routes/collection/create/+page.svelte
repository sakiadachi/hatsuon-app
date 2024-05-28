<script lang="ts">
  import CreateCollectionForm from "$lib/layout/CreateCollectionForm.svelte";
  import { collections } from "../../data";
  import { goto } from "$app/navigation";

  let title: string;
  $: title = "";

  let description: string;
  $: description = "";

  let new_collection: Collection;
  $: new_collection = {
    title,
    description,
    phrases: [],
    date: new Date().getMilliseconds(),
    id: "new-collection-id",
  };

  const add_collection = async () => {
    // TODO: replace with POST request
    collections.push(new_collection);
    await goto(`/collection/${new_collection.id}`);
  };
</script>

<div>
  <CreateCollectionForm
    pageTitle="Create Collection"
    on:click={(e) => {
      add_collection();
    }}
  >
    <label slot="form-row-1--label" for="collection-title" class=""
      >Title:</label
    >
    <input
      slot="form-row-1--input"
      type="text"
      id="collection-title"
      name="collection-title"
      bind:value={title}
      required
      maxlength="150"
      placeholder="Hey there"
      class="border rounded max-h-12 p-2"
    />

    <label slot="form-row-2--label" for="collection-description"
      >Description:
    </label>
    <textarea
      slot="form-row-2--input"
      id="collection-description"
      name="collection-description"
      bind:value={description}
      maxlength="300"
      placeholder="adsdfsadf asfasfadddd"
      rows="5"
      class="border rounded p-2"
    />
  </CreateCollectionForm>
</div>
