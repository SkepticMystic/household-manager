<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Label from "../label.svelte";
  import type { CreateBudgetItem } from "$lib/models/budgetItems";
  import { BUDGET_ITEM_CONST, BUDGET_ITEM_LABELS } from "$lib/const/budgets";
  import UserSelector from "../selectors/UserSelector.svelte";

  export let budgetItem: CreateBudgetItem;

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(e) => {
    e.code === "Escape" && dispatch("cancel");
    e.code === "Enter" && e.ctrlKey && dispatch("submit");
  }}
/>

<Label lbl="Category">
  <select autofocus class="select" bind:value={budgetItem.category}>
    {#each BUDGET_ITEM_CONST.CATEGORIES as category}
      <option value={category}>
        {BUDGET_ITEM_LABELS.CATEGORIES[category]}
      </option>
    {/each}
  </select>
</Label>
<Label lbl="Name">
  <input type="text" class="input" bind:value={budgetItem.name} />
</Label>

<Label lbl="Amount">
  <input type="number" class="input" bind:value={budgetItem.amount} />
</Label>

<Label lbl="Frequency (Days)">
  <input type="number" class="input" bind:value={budgetItem.frequency_days} />
</Label>

<UserSelector
  allowUndefined
  lbl="Attributed To (Optional)"
  bind:member_id={budgetItem.attributedTo}
/>

<Label lbl="Description (Optional)">
  <input type="text" class="input" bind:value={budgetItem.description} />
</Label>
