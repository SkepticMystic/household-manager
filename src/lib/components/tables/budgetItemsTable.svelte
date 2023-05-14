<script lang="ts">
  import { BUDGET_ITEM_LABELS } from "$lib/const/budgets";
  import type { SID, Sort } from "$lib/interfaces";
  import type { BudgetItem, DatabaseBudgetItem } from "$lib/models/budgetItems";
  import { budgetItems } from "$lib/stores/budgetItems";
  import { getProps } from "$lib/utils";
  import { Format } from "$lib/utils/format";
  import { createEventDispatcher } from "svelte";
  import SortHeader from "./sortHeader.svelte";
  import { teamMembers } from "$lib/stores/teamMembers";

  export let tableBudgetItems: SID<DatabaseBudgetItem>[];
  export let hide_columns: (keyof BudgetItem)[] = [];

  let { loadObj } = getProps();

  const dispatch = createEventDispatcher();

  const deleteBudgetItem = async (chore_id: string) => {
    loadObj["delete"] = true;
    await budgetItems.delete(chore_id);
    loadObj = {};
  };

  $: rows = tableBudgetItems.map((c) => ({
    ...c,
  }));

  let sort: Sort<keyof typeof rows[number]> = {
    by: "createdAt",
    in: -1,
  };

  // Sort budgetItems by last completed, then by created
  $: sortedBudgetItems = rows.sort((a, b) => {
    const aV = a[sort.by];
    const bV = b[sort.by];

    if (aV < bV) return -1 * sort.in;
    if (aV > bV) return 1 * sort.in;
    return 0;
  });

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

<svelte:window
  on:keydown={(e) => {
    e.altKey && e.key === "n" && dispatch("create");
  }}
/>

<table class="min-w-full divide-y divide-base-300">
  <thead>
    <tr>
      {#if !hide_columns.includes("category")}
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
        >
          <SortHeader by="category" bind:sort />
        </th>
      {/if}

      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        <SortHeader by="name" bind:sort />
      </th>

      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        <SortHeader by="frequency_days" label="Frequency" bind:sort />
      </th>
      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        <SortHeader by="amount" bind:sort />
      </th>
      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        <SortHeader by="attributedTo" label="Attributed To" bind:sort />
      </th>

      <th
        scope="col"
        class="py-3.5 pl-3 pr-4 sm:pr-0 text-sm font-semibold text-right"
      >
        Actions
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-base-200">
    {#each sortedBudgetItems as { _id, name, amount, category, createdAt, createdBy, frequency_days, updatedAt, attributedTo, description } (_id)}
      <tr>
        {#if !hide_columns.includes("category")}
          <td
            class="w-full max-w-0 py-3 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0"
          >
            <a
              href="/budgetItems/category/{category}"
              class="link link-primary font-semibold"
            >
              {BUDGET_ITEM_LABELS.CATEGORIES[category]}
            </a>

            <dl class="font-normal lg:hidden">
              <dd class="mt-1 truncate text-gray-700">{name}</dd>

              <dd class="mt-1 truncate text-gray-500 sm:hidden">
                {frequency_days} days
              </dd>
            </dl>
          </td>
        {/if}

        <td class="px-3 py-3 text-sm text-gray-500 font-semibold">
          {name}
        </td>

        <td class="px-3 py-3 text-sm text-gray-500">
          {frequency_days} days
        </td>

        <td class="px-3 py-3 text-sm text-gray-500">
          {Format.currency.EUR(amount)}
        </td>

        <td class="px-3 py-3 text-sm text-gray-500 flex flex-col gap-1">
          {attributedTo
            ? teamMembers.getMemberById(attributedTo)?.email ?? "Unknown"
            : "-"}
        </td>

        <td class="py-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button
            class="btn btn-sm btn-square btn-ghost"
            disabled={anyLoading}
            title="Edit"
            on:click={() => dispatch("modify", _id)}
          >
            ✏️
          </button>
          <button
            class="btn btn-sm btn-square btn-ghost"
            class:loading={loadObj["delete"]}
            disabled={anyLoading}
            title="Delete"
            on:click={() => deleteBudgetItem(_id)}
          >
            {#if !loadObj["delete"]}
              🗑️
            {/if}
          </button>
        </td>
      </tr>
    {/each}
  </tbody>

  <tfoot>
    <tr>
      <td colspan="3" class="px-3 py-3 text-sm text-gray-500">
        {sortedBudgetItems.length} item(s)
      </td>
      <td colspan="3" class="px-3 py-3 text-sm text-gray-500">
        {Format.currency.EUR(
          tableBudgetItems.map((c) => c.amount).reduce((a, b) => a + b, 0)
        )}
      </td>
    </tr>
  </tfoot>
</table>
