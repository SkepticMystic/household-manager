<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import { onMount } from "svelte";
  import "../app.css";
  import { page } from "$app/stores";
  import axios from "axios";
  import { groceries } from "$lib/stores/groceries";
  import { chores } from "$lib/stores/chores";
  import { teamMembers } from "$lib/stores/teamMembers";
  import type { Grocery } from "$lib/models/groceries";
  import type { DatabaseChore } from "$lib/models/chores";
  import type { SID } from "$lib/interfaces";
  import type { DatabaseBudgetItem } from "$lib/models/budgetItems";
  import { budgetItems } from "$lib/stores/budgetItems";
  import { STORE_MAP } from "$lib/stores";

  let loading = true;

  onMount(async () => {
    if (!$page.data.user) return (loading = false);

    const { data } = await axios.get<{
      groceries: SID<Grocery>[];
      chores: SID<DatabaseChore>[];
      budgetItems: SID<DatabaseBudgetItem>[];
      teamMembers: SID<Lucia.UserAttributes>[];
    }>("/api/load");

    $groceries = data.groceries.map(STORE_MAP.groceries.unserialize);
    $chores = data.chores.map(STORE_MAP.chores.unserialize);
    $budgetItems = data.budgetItems.map(STORE_MAP.budgetItems.unserialize);

    $teamMembers = data.teamMembers;

    console.log({ $groceries, $chores, $budgetItems, $teamMembers });

    loading = false;
  });
</script>

<header>
  <Navbar />
</header>

<main class="lg:mx-14 md:mx-9 sm:mx-6 mx-2 my-4">
  <slot />
</main>

<ToastList />
