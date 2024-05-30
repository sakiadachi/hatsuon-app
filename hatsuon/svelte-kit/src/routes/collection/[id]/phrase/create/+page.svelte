<script lang="ts">
  import { goto } from "$app/navigation";
  import CreateCollectionForm from "$lib/layout/CreateCollectionForm.svelte";
  import current_data from "$lib/store/current_collection";
  import collection_store from "$lib/store/collection_store";

  const { current_collection, collection_id } = current_data;
  const { add_phrase } = collection_store;
  let title: string;
  $: title = "";

  let description: string;
  $: description = "";

  let new_phrase: Phrase;
  $: new_phrase = {
    title,
    description,
    collection: $current_collection?.id || undefined,
  };

  const create_phrase = async () => {
    const result = await add_phrase(new_phrase);
    if (result.ok) {
      const json = (await result.json()) as Phrase;
      goto(`/collection/${$collection_id}/phrase/${json.uuid}}`);
    }
    // TODO: Add error messages
  };
</script>

<CreateCollectionForm
  pageTitle="Add Phrase"
  on:click={(e) => {
    create_phrase();
  }}
>
  <label slot="form-row-1--label" for="phrase-title" class="">Title:</label>
  <input
    slot="form-row-1--input"
    type="text"
    id="phrase-title"
    name="phrase-title"
    bind:value={title}
    required
    maxlength="150"
    placeholder="Hey there"
    class="border rounded p-2"
  />

  <label slot="form-row-2--label" for="phrase-description">Description:</label>
  <textarea
    slot="form-row-2--input"
    id="phrase-description"
    name="phrase-description"
    bind:value={description}
    maxlength="300"
    placeholder="adsdfsadf asfasfadddd"
    rows="5"
    class="border rounded p-2"
  />
  <label slot="form-row-3--label" for="upload-audio-file"
    >Choose audio file:</label
  >
  <input
    slot="form-row-3--input"
    type="file"
    id="upload-audio-file"
    accept=".wav,.mp3"
    required
    class=""
  />
</CreateCollectionForm>
