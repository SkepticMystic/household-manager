<script lang="ts">
  import { page } from "$app/stores";
  import CreateChore from "$lib/components/editors/createChore.svelte";
  import ModifyChore from "$lib/components/editors/modifyChore.svelte";
  import Modal from "$lib/components/modals/modal.svelte";
  import ChoresTable from "$lib/components/tables/choresTable.svelte";
  import { CHORE_LABELS } from "$lib/const/chores";
  import type { Chore } from "$lib/models/chores";
  import { chores } from "$lib/stores/chores";

  const area = $page.params.area as Chore["area"];

  let opens = {
    create: false,
    update: false,
  };

  let chore_id: string | null = null;

  const close = (key: keyof typeof opens) => (opens[key] = false);
</script>

{#if opens["create"]}
  <Modal title="Create Chore" on:close={() => close("create")}>
    <CreateChore on:close={() => close("create")} />
  </Modal>
{/if}
{#if opens["update"] && chore_id}
  <Modal title="Update Chore" on:close={() => close("update")}>
    <ModifyChore {chore_id} on:close={() => close("update")} />
  </Modal>
{/if}

<div class="flex justify-between my-3">
  <h1 class="text-2xl font-semibold">Chores in {CHORE_LABELS.AREAS[area]}</h1>
  <div class="flex flex-wrap gap-3 items-center">
    <button class="btn btn-primary" on:click={() => (opens.create = true)}>
      Create
    </button>
  </div>
</div>

<ChoresTable
  hide_columns={["area"]}
  tableChores={$chores.filter((c) => c.area === area)}
  on:create={() => (opens.create = true)}
  on:modify={(e) => {
    chore_id = e.detail;
    opens.update = true;
  }}
/>
