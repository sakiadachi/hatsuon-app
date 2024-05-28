<script lang="ts">
  import { goto } from "$app/navigation";
  import CreateCollectionForm from "$lib/layout/CreateCollectionForm.svelte";
  import { collections, phrases } from "../../../../data";
  import current_data from "$lib/store/current_correction";

  const { collection_id } = current_data;
  let title: string;
  $: title = "";

  let description: string;
  $: description = "";

  let new_phrase: Phrase;
  $: new_phrase = {
    title,
    description,
    recording: "",
    takes: [],
    date: new Date().getMilliseconds(),
    id: "new-phrase-id",
  };

  const add_phrase = async () => {
    // TODO: replace with POST request
    const collection_index = collections.findIndex(
      (c) => c.id === $collection_id
    );
    if (collection_index > 0) {
      const new_collection = {
        ...collections[collection_index],
        phrases: [...collections[collection_index].phrases, new_phrase.id],
      };
      collections[collection_index] = new_collection;
    }
    phrases.push(new_phrase);
    await goto(`/collection/${$collection_id}/phrase/${new_phrase.id}`);
  };
</script>

<CreateCollectionForm
  pageTitle="Add Phrase"
  on:click={(e) => {
    add_phrase();
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
