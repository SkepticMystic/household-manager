<script>
  import { groceries } from "$lib/stores/groceries";
  import { Format } from "$lib/utils/format";
  import Modal from "../modals/modal.svelte";

  let open = true;
</script>

{#if open}
  <Modal bind:open>
    <p class="text-center text-3xl">Welcome to Zolos Jobs!</p>
    <p class="text-center text-3xl">Welcome to Zolos Jobs!</p>
    <p class="text-center text-3xl">Welcome to Zolos Jobs!</p>
    <p class="text-center text-3xl">Welcome to Zolos Jobs!</p>
  </Modal>
{/if}

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

      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-base-200">
    {#each $groceries as { name, quantity, price, purchasedBy, purchasedAt }}
      <tr>
        <td
          class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0"
        >
          {name}
          <dl class="font-normal lg:hidden">
            <dd class="mt-1 truncate text-gray-700">{quantity}</dd>

            <dd class="mt-1 truncate text-gray-500 sm:hidden">
              {price ? Format.currency.EUR(price) : "-"}
            </dd>
          </dl>
        </td>
        <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          {quantity}
        </td>

        <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
          {price ? Format.currency.EUR(price) : "-"}
        </td>

        <td class="px-3 py-4 text-sm text-gray-500">
          {purchasedAt ? "✅" : "❌"}
        </td>
        <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <a href="#" class="text-indigo-600 hover:text-indigo-900"> Edit</a>
        </td>
      </tr>
    {/each}

    <!-- More people... -->
  </tbody>
</table>
