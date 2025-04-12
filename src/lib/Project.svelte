<script>
  export let data = {};
  export let hLevel = 2;
</script>

<article>
  <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
  <img src={data.image} alt="" />
  <div>
    <p>{data.description}</p>
    <p class="year">Year: {data.year}</p>
  </div>
</article>

<style>
  img {
    max-width: 100%;
    height: auto;
  }

  .year {
    font-family: Baskerville;
    font-variant-numeric: oldstyle-nums;
  }
</style>
