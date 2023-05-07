<script lang="ts">
  import XMark from "../icons/xMark.svelte";

  export let open: boolean;

  const handleBackgroundClick = (e: MouseEvent) => {
    if ((<HTMLElement | null>e.target)?.classList.contains("background")) {
      open = false;
    }
  };
</script>

<svelte:window on:click={handleBackgroundClick} />

<div
  class="background fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-50 bg-black"
>
  <div class="relative h-auto max-w-2xl rounded-md bg-base-100 p-2">
    <div class="flex justify-between">
      <div />
      <button
        class="btn btn-sm btn-square btn-ghost"
        on:click={() => (open = false)}
      >
        <XMark />
      </button>
    </div>

    <div class="px-4 pb-4 pt-1">
      <slot />
    </div>
  </div>
</div>
