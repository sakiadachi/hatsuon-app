<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";
  import current_data from "$lib/store/current_collection";
  import { fetchApi } from "$lib/utils/fetchApi";

  const { current_collection, collection_id } = current_data;

  let title: string;
  let description: string;
  let recording: File | undefined;

  const handleSubmit = async (
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) => {
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    if ($current_collection?.id == null) {
      throw Error("Cannot find collection");
    }
    formData.append("collection", $current_collection.id);

    const result = await fetchApi("api/v1/phrases/", {
      method: "POST",
      body: formData,
    });

    if (result.ok) {
      const json = (await result.json()) as Phrase;
      goto(`/collection/${$collection_id}/phrase/${json.uuid}}`);
    }
  };
</script>

<div class="h-full">
  <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data">
    <fieldset class="flex flex-col gap-6">
      <legend class="d-flex justify-center w-full"
        ><h1 class="mb-12">Add phrase</h1></legend
      >
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <label for="phrase-title" class="">Title:</label>
        <input
          type="text"
          id="phrase-title"
          name="title"
          bind:value={title}
          required
          maxlength="150"
          placeholder="Hey there"
          class="border rounded p-2"
        />
      </div>
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <label for="phrase-description">Description:</label>
        <textarea
          id="phrase-description"
          name="description"
          bind:value={description}
          maxlength="300"
          placeholder="adsdfsadf asfasfadddd"
          rows="5"
          class="border rounded p-2"
        />
      </div>
      <div class="grid grid-cols-[10rem_1fr] grid-rows-1 gap-4">
        <label for="upload-audio-file">Choose audio file:</label>
        <input
          type="file"
          id="upload-audio-file"
          accept=".wav,.mp3,.m4a"
          required
          class=""
          name="recording"
          bind:value={recording}
        />
      </div>
    </fieldset>

    <div class="flex justify-end col-span-3">
      <Button text="Submit" type="submit" on:submit />
    </div>
  </form>
</div>
