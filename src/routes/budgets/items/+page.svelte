<script lang="ts">
  import CreateBudgetItem from "$lib/components/editors/createBudgetItem.svelte";
  import ModifyBudgetItem from "$lib/components/editors/modifyBudgetItem.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
  import BudgetItemsTable from "$lib/components/tables/budgetItemsTable.svelte";
  import { budgetItems } from "$lib/stores/budgetItems";

  let opens = {
    create: false,
    update: false,
  };

  let budgetItem_id: string | null = null;

  const close = (key: keyof typeof opens) => (opens[key] = false);
</script>

{#if opens["create"]}
  <Modal title="Create BudgetItem" on:close={() => close("create")}>
    <CreateBudgetItem on:close={() => close("create")} />
  </Modal>
{/if}
{#if opens["update"] && budgetItem_id}
  <Modal title="Update BudgetItem" on:close={() => close("update")}>
    <ModifyBudgetItem {budgetItem_id} on:close={() => close("update")} />
  </Modal>
{/if}

<div class="flex justify-between my-3">
  <h1 class="text-2xl font-semibold">Budget Items</h1>
  <div class="flex flex-wrap gap-3 items-center">
    <button class="btn btn-primary" on:click={() => (opens.create = true)}>
      Create
    </button>
  </div>
</div>

<BudgetItemsTable
  tableBudgetItems={$budgetItems}
  on:create={() => (opens.create = true)}
  on:modify={(e) => {
    budgetItem_id = e.detail;
    opens.update = true;
  }}
/>
