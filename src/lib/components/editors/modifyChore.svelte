<script lang="ts">
  import { chores } from "$lib/stores/chores";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import ResultText from "../resultText.svelte";
  import ChoreEditor from "./choreEditor.svelte";

  export let chore_id: string;

  let { loadObj, err } = getProps();
  const dispatch = createEventDispatcher();

  let chore = $chores.find((g) => g._id === chore_id);

  const update = async () => {
    if (!chore) return;

    loadObj["update"] = true;
    const res = await chores.update(chore_id, chore);
    loadObj = {};

    if (res.ok) dispatch("close");
    else err = res.error;
  };

  const deleteChore = async () => {
    if (!chore) return;

    loadObj["delete"] = true;
    const res = await chores.delete(chore_id);
    loadObj = {};

    if (res?.ok) dispatch("close");
    else if (res) err = res.error;
  };

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

{#if chore}
  <ChoreEditor
    bind:chore
    on:submit={update}
    on:cancel={() => dispatch("close")}
  />

  <div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
    <button
      class="btn btn-error"
      class:loading={loadObj["delete"]}
      disabled={anyLoading}
      on:click={deleteChore}
    >
      {#if !loadObj["delete"]}
        Delete
      {/if}
    </button>

    <button
      class="btn btn-warning"
      disabled={anyLoading}
      on:click={() => dispatch("close")}
    >
      Cancel
    </button>

    <button
      class="btn btn-primary"
      class:loading={loadObj["update"]}
      disabled={anyLoading}
      on:click={update}
    >
      {#if !loadObj["update"]}
        Update
      {/if}
    </button>
  </div>

  <ResultText {err} />
{/if}
