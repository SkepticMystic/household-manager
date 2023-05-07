<script lang="ts">
  import CreateGrocery from "$lib/components/editors/createGrocery.svelte";
  import ModifyGrocery from "$lib/components/editors/modifyGrocery.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
  import GroceriesTable from "$lib/components/tables/groceriesTable.svelte";

  let opens = {
    create: false,
    update: false,
  };

  let grocery_id: string | null = null;

  const close = (key: keyof typeof opens) => (opens[key] = false);
</script>

{#if opens["create"]}
  <Modal title="Create Grocery" on:close={() => close("create")}>
    <CreateGrocery on:close={() => close("create")} />
  </Modal>
{/if}
{#if opens["update"] && grocery_id}
  <Modal title="Create Grocery" on:close={() => close("update")}>
    <ModifyGrocery {grocery_id} on:close={() => close("update")} />
  </Modal>
{/if}

<div class="flex justify-between my-3">
  <h1 class="text-2xl font-semibold">Groceries</h1>
  <div class="flex flex-wrap gap-3 items-center">
    <button class="btn btn-primary" on:click={() => (opens.create = true)}>
      Create
    </button>
  </div>
</div>

<GroceriesTable
  on:modify={(e) => {
    grocery_id = e.detail;
    opens.update = true;
  }}
/>
