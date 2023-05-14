<script lang="ts">
  import { CHORES_CONST, CHORE_LABELS } from "$lib/const/chores";
  import type { CreateChore } from "$lib/models/chores";
  import { createEventDispatcher } from "svelte";
  import Label from "../label.svelte";
  import { page } from "$app/stores";

  export let chore: CreateChore;

  const dispatch = createEventDispatcher();

  const specifiedArea = $page.params.area;
</script>

<svelte:window
  on:keydown={(e) => {
    e.code === "Escape" && dispatch("cancel");
    e.code === "Enter" && e.ctrlKey && dispatch("submit");
  }}
/>

<Label lbl="Area">
  <select autofocus={!specifiedArea} class="select" bind:value={chore.area}>
    {#each CHORES_CONST.AREAS as area}
      <option value={area}>{CHORE_LABELS.AREAS[area]}</option>
    {/each}
  </select>
</Label>

<Label lbl="Name">
  <input
    autofocus={!!specifiedArea}
    type="text"
    class="input"
    bind:value={chore.name}
  />
</Label>

<Label lbl="Frequency (Days)">
  <input type="number" class="input" bind:value={chore.frequency_days} />
</Label>

<Label lbl="Last Completed">
  <input type="date" class="input" bind:value={chore.lastCompletedAt} />
</Label>
