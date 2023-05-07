<script lang="ts">
  import type { CreateGrocery } from "$lib/models/groceries";
  import { createEventDispatcher } from "svelte";
  import Label from "../label.svelte";

  export let grocery: CreateGrocery;

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(e) => {
    e.code === "Escape" && dispatch("cancel");
    e.code === "Enter" && e.ctrlKey && dispatch("submit");
  }}
/>

<Label lbl="Name">
  <input autofocus type="text" class="input" bind:value={grocery.name} />
</Label>

<Label lbl="Quantity">
  <input type="number" class="input" bind:value={grocery.quantity} />
</Label>

<Label lbl="Price">
  <input type="number" class="input" bind:value={grocery.price} />
</Label>
