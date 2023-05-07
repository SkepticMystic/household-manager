<script lang="ts">
  import { APP_NAME } from "$lib/const";
</script>

<div class="hero mt-32">
  <div class="hero-content text-center">
    <div class="max-w-lg">
      <h1 class="text-5xl font-bold">{APP_NAME}</h1>

      <div class="flex flex-wrap justify-center gap-5 my-14">
        <a href="/groceries">
          <button class="btn btn-secondary">Groceries</button>
        </a>
      </div>
    </div>
  </div>
</div>
