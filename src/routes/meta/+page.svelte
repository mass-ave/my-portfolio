<svelte:head>
  <title>Meta</title>
</svelte:head>
<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  let data = [];

  onMount(async () => {
    data = await d3.csv("/loc.csv");
  });
</script>
<h1>Meta</h1>
<p>Total lines of code: {data.length}</p>