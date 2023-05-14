<script lang="ts">
  import type { Sort } from "$lib/interfaces";
  import ArrowDown from "../icons/arrowDown.svelte";
  import ArrowUp from "../icons/arrowUp.svelte";

  export let sort: Sort;
  export let by: string;
</script>

{#if sort.by === by}
  {#if sort.in === 1}
    <ArrowUp />
  {:else if sort.in === -1}
    <ArrowDown />
  {/if}
{:else}
  <span />
{/if}
