<script lang="ts">
  import type { BudgetItem, CreateBudgetItem } from "$lib/models/budgetItems";
  import { budgetItems } from "$lib/stores/budgetItems";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import ResultText from "../resultText.svelte";
  import BudgetItemEditor from "./budgetItemEditor.svelte";
  import { page } from "$app/stores";

  let { loading, err } = getProps();

  let budgetItem: CreateBudgetItem = {
    name: "",
    amount: 0,
    category:
      ($page.params.category as BudgetItem["category"] | undefined) ?? "food",
    frequency_days: 0,
  };

  const dispatch = createEventDispatcher();

  const create = async () => {
    loading = true;
    const res = await budgetItems.create(budgetItem);
    loading = false;

    if (res.ok) dispatch("close");
    else err = res.error;
  };
</script>

<BudgetItemEditor
  bind:budgetItem
  on:submit={create}
  on:cancel={() => dispatch("close")}
/>

<div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
  <button
    class="btn btn-warning"
    disabled={loading}
    on:click={() => dispatch("close")}
  >
    Cancel
  </button>

  <button
    class="btn btn-primary"
    class:loading
    disabled={loading}
    on:click={create}
  >
    {#if !loading}
      Create
    {/if}
  </button>
</div>

<ResultText {err} />
