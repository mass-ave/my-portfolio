<script>
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
  let data = fetch("https://api.github.com/users/mass-ave");
</script>
<h1>Kevin Acevedo</h1>
<p>
  Hi! I am a Senior at MIT studying Computer Science (6-3) and currently
  taking Interactive Data Visualization and Society. Feel free to reach out
  to me using the <a href="./contact">Contact</a> page of the website.
</p>
<img src="images/sunrise.jpg" alt="sunrise of the Boston skyline" />
{#await fetch("https://api.github.com/users/mass-ave")}
  <p>Loading...</p>
{:then response}
  {#await response.json()}
    <p>Decoding...</p>
  {:then data}
    <section>
      <h2>My GitHub Stats</h2>
      <dl>
        <dt>Followers:</dt>
        <dd>{data.followers}</dd>
        <dt>Following:</dt>
        <dd>{data.following}</dd>
        <dt>Public Repositories:</dt>
        <dd>{data.public_repos}</dd>
      </dl>
    </section>
  {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
  {/await}
{:catch error}
  <p class="error">Something went wrong: {error.message}</p>
{/await}
<h2>Latest Projects</h2>
<div class="projects">
  {#each [projects[0], projects[3], projects[7]] as p}
  <Project data={p} hLevel="3" />
  {/each}
</div>
<style>
  section {
    padding: 1em;
    border-radius: 1em;
    max-width: 100ch;
    margin: 1em auto;
    text-align: center;
  }

  dl {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1em;
  }

  dt {
    font-weight: bold;
    text-align: right;
  }

  dd {
    text-align: left;
    margin: 0;
  }

  .error {
    color: oklch(43.72% 0.1676 27.84);
    font-weight: bold;
  }
</style>