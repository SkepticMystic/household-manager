<script lang="ts">
  import { deleteGrocery, groceries } from "$lib/stores/groceries";
  import { getProps } from "$lib/utils";
  import { Format } from "$lib/utils/format";
  import { createEventDispatcher } from "svelte";

  let { loadObj } = getProps();

  const dispatch = createEventDispatcher();

  const deleteGroceryWrapper = async (grocery_id: string) => {
    loadObj["delete"] = true;
    await deleteGrocery(grocery_id);
    loadObj = {};
  };

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

<table class="min-w-full divide-y divide-base-300">
  <thead>
    <tr>
      <th
        scope="col"
        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
      >
        Name
      </th>

      <th
        scope="col"
        class="hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
      >
        Quantity
      </th>

      <th
        scope="col"
        class="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell"
      >
        Price
      </th>

      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        Bought
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
    {#each $groceries as { _id, name, quantity, price, purchasedBy, purchasedAt }}
      <tr>
        <td
          class="w-full max-w-0 py-3 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0"
        >
          <span>{name}</span>
          <dl class="font-normal lg:hidden">
            <dd class="mt-1 truncate text-gray-700">{quantity}</dd>

            <dd class="mt-1 truncate text-gray-500 sm:hidden">
              {price ? Format.currency.EUR(price) : "-"}
            </dd>
          </dl>
        </td>
        <td class="hidden px-3 py-3 text-sm text-gray-500 lg:table-cell">
          {quantity}
        </td>

        <td class="hidden px-3 py-3 text-sm text-gray-500 sm:table-cell">
          {price ? Format.currency.EUR(price) : "-"}
        </td>

        <td class="px-3 py-3 text-sm text-gray-500">
          {purchasedAt ? "✅" : "❌"}
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
            on:click={() => deleteGroceryWrapper(_id)}
          >
            {#if !loadObj["delete"]}
              🗑️
            {/if}
          </button>
        </td>
      </tr>
    {/each}

    <!-- More people... -->
  </tbody>
</table>
