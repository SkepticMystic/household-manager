<script lang="ts">
  import { budgetItems } from "$lib/stores/budgetItems";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import ResultText from "../resultText.svelte";
  import BudgetItemEditor from "./budgetItemEditor.svelte";

  export let budgetItem_id: string;

  let { loadObj, err } = getProps();
  const dispatch = createEventDispatcher();

  let budgetItem = $budgetItems.find((g) => g._id === budgetItem_id);

  const update = async () => {
    if (!budgetItem) return;

    loadObj["update"] = true;
    const res = await budgetItems.update(budgetItem_id, budgetItem);
    loadObj = {};

    if (res.ok) dispatch("close");
    else err = res.error;
  };

  const deleteBudgetItem = async () => {
    if (!budgetItem) return;

    loadObj["delete"] = true;
    const res = await budgetItems.delete(budgetItem_id);
    loadObj = {};

    if (res?.ok) dispatch("close");
    else if (res) err = res.error;
  };

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

{#if budgetItem}
  <BudgetItemEditor
    bind:budgetItem
    on:submit={update}
    on:cancel={() => dispatch("close")}
  />

  <div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
    <button
      class="btn btn-error"
      class:loading={loadObj["delete"]}
      disabled={anyLoading}
      on:click={deleteBudgetItem}
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
