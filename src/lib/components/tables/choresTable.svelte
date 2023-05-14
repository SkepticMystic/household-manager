<script lang="ts">
  import { CHORE_LABELS } from "$lib/const/chores";
  import type { SID } from "$lib/interfaces";
  import type { Chore, DatabaseChore } from "$lib/models/chores";
  import { chores } from "$lib/stores/chores";
  import { getProps } from "$lib/utils";
  import {
    getChoreNextDueDate,
    getChoreNextDueFraction,
  } from "$lib/utils/chores";
  import { createEventDispatcher } from "svelte";

  export let tableChores: SID<DatabaseChore>[];
  export let hide_columns: (keyof Chore)[] = [];

  let { loadObj } = getProps();

  const dispatch = createEventDispatcher();

  const deleteChore = async (chore_id: string) => {
    loadObj["delete"] = true;
    await chores.delete(chore_id);
    loadObj = {};
  };

  // Sort chores by last completed, then by created
  $: sortedChores = tableChores.sort((a, b) => {
    if (a.lastCompletedAt === b.lastCompletedAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return a.createdAt ? 1 : -1;
    }
  });

  $: anyLoading = Object.keys(loadObj).length > 0;
</script>

<table class="min-w-full divide-y divide-base-300">
  <thead>
    <tr>
      {#if !hide_columns.includes("area")}
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
        >
          Area
        </th>
      {/if}

      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        Name
      </th>

      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        Frequency
      </th>
      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        Last Completed
      </th>
      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">
        Next Due
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
    {#each sortedChores as { _id, name, area, createdAt, frequency_days, updatedAt, lastCompletedAt }}
      {@const nextDue = getChoreNextDueDate({
        createdAt,
        frequency_days,
        lastCompletedAt,
      })}
      {@const nextDueFraction = getChoreNextDueFraction(
        nextDue,
        frequency_days
      )}
      <tr>
        {#if !hide_columns.includes("area")}
          <td
            class="w-full max-w-0 py-3 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-0"
          >
            <a href="/chores/area/{area}" class="link link-primary">
              {CHORE_LABELS.AREAS[area]}
            </a>

            <dl class="font-normal lg:hidden">
              <dd class="mt-1 truncate text-gray-700">{name}</dd>

              <dd class="mt-1 truncate text-gray-500 sm:hidden">
                {frequency_days} days
              </dd>
            </dl>
          </td>
        {/if}

        <td class="px-3 py-3 text-sm text-gray-500">
          {name}
        </td>

        <td class="px-3 py-3 text-sm text-gray-500">
          {frequency_days} days
        </td>

        <td class="px-3 py-3 text-sm text-gray-500">
          <button
            class="btn btn-sm btn-ghost btn-square"
            class:loading={loadObj["complete"]}
            disabled={anyLoading}
            title="Mark as complete"
            on:click={() =>
              chores.update(_id, {
                lastCompletedAt: new Date(),
              })}
          >
            {#if !loadObj["complete"]}
              {lastCompletedAt
                ? new Date(lastCompletedAt).toLocaleDateString()
                : "Never"}
            {/if}
          </button>
        </td>

        <td class="px-3 py-3 text-sm text-gray-500 flex flex-col gap-1">
          <span>{nextDue.toLocaleDateString()}</span>
          <progress
            class="progress w-20"
            class:progress-success={nextDueFraction < 0.25}
            class:progress-info={nextDueFraction < 0.5}
            class:progress-warning={nextDueFraction >= 0.5 &&
              nextDueFraction < 0.75}
            class:progress-error={nextDueFraction >= 0.75}
            value={nextDueFraction * 100}
            max="100"
          />
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
            on:click={() => deleteChore(_id)}
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
