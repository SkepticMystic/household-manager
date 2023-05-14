<script lang="ts">
  import type { Sort } from "$lib/interfaces";
  import SortArrow from "./sortArrow.svelte";

  export let sort: Sort;
  export let by: string;
  export let label: string | undefined = undefined;
</script>

<button
  class="flex gap-2"
  on:click={() => {
    if (sort.by === by) sort.in *= -1;
    else {
      sort.by = by;
      sort.in = -1;
    }
  }}
>
  <span class="capitalize">
    {label ?? by}
  </span>
  <SortArrow {sort} {by} />
</button>
