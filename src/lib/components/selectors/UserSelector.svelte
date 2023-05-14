<script lang="ts">
  import { teamMembers } from "$lib/stores/teamMembers";
  import Label from "../label.svelte";

  export let member_id: string | undefined;
  export let lbl: string = "Team Member";
  export let allowUndefined: boolean = false;
</script>

<Label {lbl}>
  <select class="select" bind:value={member_id}>
    {#if allowUndefined}
      <option value={undefined}>-</option>
    {/if}
    {#each $teamMembers as member}
      <option value={member._id}>{member.email}</option>
    {/each}
  </select>
</Label>
