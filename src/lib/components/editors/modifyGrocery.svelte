<script lang="ts">
  import {
    deleteGrocery,
    groceries,
    updateGrocery,
  } from "$lib/stores/groceries";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import ResultText from "../resultText.svelte";
  import GroceryEditor from "./groceryEditor.svelte";

  export let grocery_id: string;

  let { loadObj, err } = getProps();
  const dispatch = createEventDispatcher();

  let grocery = $groceries.find((g) => g._id === grocery_id);

  const update = async () => {
    if (!grocery) return;

    loadObj["update"] = true;
    const res = await updateGrocery(grocery_id, grocery, {
      toast: ["suc"],
    });
    loadObj = {};

    if (res.ok) dispatch("close");
    else err = res.error;
  };

  const deleteThisGrocery = async () => {
    if (!grocery) return;

    loadObj["delete"] = true;
    const res = await deleteGrocery(grocery_id, {
      toast: ["suc"],
    });
    loadObj = {};

    if (res?.ok) dispatch("close");
    else if (res) err = res.error;
  };

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

{#if grocery}
  <GroceryEditor
    bind:grocery
    on:submit={update}
    on:cancel={() => dispatch("close")}
  />

  <div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
    <button
      class="btn btn-error"
      class:loading={loadObj["delete"]}
      disabled={anyLoading}
      on:click={deleteThisGrocery}
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
