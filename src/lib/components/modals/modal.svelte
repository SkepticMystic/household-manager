<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import XMark from "../icons/xMark.svelte";

  export let title = "";

  const dispatch = createEventDispatcher();

  const handleBackgroundClick = (e: MouseEvent) => {
    if (
      (<HTMLElement | null>e.target)?.classList.contains("modal-background")
    ) {
      dispatch("close");
    }
  };
</script>

<svelte:window on:click={handleBackgroundClick} />

<div
  class="modal-background fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-opacity-50 bg-black"
>
  <div class="relative h-auto max-w-2xl rounded-md bg-base-100 p-3">
    <div class="flex justify-between">
      <h2 class="text-lg px-2 font-semibold">{title}</h2>
      <button
        class="btn btn-sm btn-square btn-ghost"
        on:click={() => dispatch("close")}
      >
        <XMark />
      </button>
    </div>

    <div class="px-4 pb-4 pt-2">
      <slot />
    </div>
  </div>
</div>
