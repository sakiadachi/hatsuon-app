<script lang="ts">
  import CreateCollectionForm from "$lib/layout/CreateCollectionForm.svelte";
  import { collections } from "../../data";
  import { goto } from "$app/navigation";
  import { fetchApi } from "$lib/utils/fetchApi";

  let title: string;
  $: title = "";

  let description: string;
  $: description = "";

  let new_collection: Collection;
  $: new_collection = {
    title,
    description,
    phrases: [],
  };

  const add_collection = async () => {
    const result = await fetchApi(
      "api/v1/collections/",
      {
        method: "POST",
        body: JSON.stringify(new_collection),
      },
      { "Content-Type": "application/json" },
    );
    if (result.ok) {
      console.log("ok");
    }
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
