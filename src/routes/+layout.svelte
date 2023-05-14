<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import ToastList from "$lib/components/toastList.svelte";
  import { onMount } from "svelte";
  import "../app.css";
  import { page } from "$app/stores";
  import axios from "axios";
  import { groceries } from "$lib/stores/groceries";
  import { chores } from "$lib/stores/chores";

  let loading = true;

  onMount(async () => {
    if (!$page.data.user) return (loading = false);

    const { data } = await axios.get("/api/load");

    console.log(data);

    $groceries = data.groceries;
    $chores = data.chores;

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
