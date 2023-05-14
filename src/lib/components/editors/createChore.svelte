<script lang="ts">
  import type { CreateChore } from "$lib/models/chores";
  import { chores } from "$lib/stores/chores";
  import { getProps } from "$lib/utils";
  import { createEventDispatcher } from "svelte";
  import ResultText from "../resultText.svelte";
  import ChoreEditor from "./choreEditor.svelte";

  let { loading, err } = getProps();

  let chore: CreateChore = {
    name: "",
    area: "kitchen",
    frequency_days: 0,
  };

  const dispatch = createEventDispatcher();

  const create = async () => {
    loading = true;
    const res = await chores.create(chore);
    loading = false;

    if (res.ok) dispatch("close");
    else err = res.error;
  };
</script>

<ChoreEditor
  bind:chore
  on:submit={create}
  on:cancel={() => dispatch("close")}
/>

<div class="flex flex-wrap gap-2 justify-between mt-5 mb-3">
  <button
    class="btn btn-warning"
    disabled={loading}
    on:click={() => dispatch("close")}
  >
    Cancel
  </button>

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
</div>

<ResultText {err} />
