<script>
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
</script>
<h1>Kevin Acevedo</h1>
<p>
  Hi! I am a Senior at MIT studying Computer Science (6-3) and currently
  taking Interactive Data Visualization and Society. Feel free to reach out
  to me using the <a href="./contact">Contact</a> page of the website.
</p>
<img src="images/sunrise.jpg" alt="sunrise of the Boston skyline" />
<h2>Latest Projects</h2>
<div class="projects">
  {#each [projects[0], projects[3], projects[7]] as p}
  <Project data={p} hLevel="3" />
  {/each}
</div>