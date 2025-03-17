<script>
    import { page } from "$app/stores";
    let pages = [
        { url: "./", title: "Home" },
        { url: "./projects", title: "Projects" },
        { url: "./resume", title: "Resume" },
        { url: "./contact", title: "Contact" },
        { url: "./meta", title: "Meta" },
        { url: "https://github.com/mass-ave", title: "GitHub" },
    ];

  let localStorage = globalThis.localStorage ?? {};
  let colorScheme = localStorage.colorScheme ?? "light dark";
 	let root = globalThis?.document?.documentElement;
 	$: root?.style.setProperty("color-scheme", colorScheme);
  $: localStorage.colorScheme = colorScheme;
</script>
<label class="color-scheme">
    Theme:
   <select bind:value={ colorScheme }>
        <option value="light dark">Automatic</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>
</label>
<nav>
    {#each pages as p}
    <a
    href={p.url}
    class:current={"." + $page.route.id === p.url}
    target={p.url.startsWith("http") ? "_blank" : null}
    >
    {p.title}
    </a>

    {/each}
</nav>
<style>
    nav {
      display: flex;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: oklch(50% 10% 200 / 40%);
    }
    
    nav a {
      flex: 1;
      text-decoration: none;
      color: inherit;
      text-align: center;
      padding: 0.5em;
    }
    
    nav a.current {
      border-bottom-width: 0.4em;
      border-bottom-style: solid;
      border-bottom-color: var(--color-accent);
      padding-bottom: 0.5em;
    }
    
    nav a:hover {
      border-bottom-width: 0.4em;
      border-bottom-style: solid;
      border-bottom-color: var(--color-accent);
      background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
    }

    label.color-scheme {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 75%;
        display: inline-flex;
        gap: 0.5em;
    }

    label {
    font: inherit;
    }

    label {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    }
</style>
<slot />