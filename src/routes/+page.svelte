<script>
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
  import { onMount } from "svelte";

  let githubData = null;
  let loading = true;
  let error = null;
  let data = fetch("https://api.github.com/users/mass-ave");
  onMount(async () => {
    try {
      const response = await fetch("https://api.github.com/users/mass-ave");
      githubData = await response.json();
    } catch (err) {
      error = err;
    }
    loading = false;
  });

</script>
<h1>Kevin Acevedo</h1>
<p>
  Hi! I am a Senior at MIT studying Computer Science (6-3) and currently
  taking Interactive Data Visualization and Society. Feel free to reach out
  to me using the <a href="./contact">Contact</a> page of the website.
</p>
<img src="images/sunrise.jpg" alt="sunrise of the Boston skyline" />
{#if loading}
    <p>Loading...</p>
{:else if error}
    <p class="error">Something went wrong: {error.message}</p>
{:else}
    <section>
        <h2>My GitHub Stats</h2>
        <dl class="stats">
            <dt>Followers:</dt>
            <dd>{githubData.followers}</dd>
            <dt>Following:</dt>
            <dd>{githubData.following}</dd>
            <dt>Public Repositories:</dt>
            <dd>{githubData.public_repos}</dd>
        </dl>
    </section>
{/if}
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

  .error {
    color: oklch(43.72% 0.1676 27.84);
    font-weight: bold;
  }
</style>