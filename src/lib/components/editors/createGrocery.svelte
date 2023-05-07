<script lang="ts">
  import type { CreateGrocery } from "$lib/models/groceries";
  import { createGrocery } from "$lib/stores/groceries";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import GroceryEditor from "./groceryEditor.svelte";
  import ResultText from "../resultText.svelte";

  let { loading, err } = getProps();

  let grocery: CreateGrocery = {
    name: "",
    quantity: 1,
  };

  const dispatch = createEventDispatcher();

  const create = async () => {
    loading = true;
    const res = await createGrocery(grocery, { toast: ["suc"] });
    loading = false;

    if (res.ok) dispatch("close");
    else err = res.error;
  };
</script>

<GroceryEditor
  bind:grocery
  on:submit={create}
  on:cancel={() => dispatch("close")}
/>

<div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
  <button
    class="btn btn-primary"
    class:loading
    disabled={loading}
    on:click={create}
  >
    {#if !loading}
      Create
    {/if}
  </button>

  <button
    class="btn btn-warning"
    disabled={loading}
    on:click={() => dispatch("close")}
  >
    Cancel
  </button>
</div>

<ResultText {err} />
