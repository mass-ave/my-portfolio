<svelte:head>
  <title>Meta</title>
</svelte:head>
<script>
  import * as d3 from "d3";
  import { base } from '$app/paths';
  import { onMount } from "svelte";

  let data = [];
  let commits = [];

  onMount(async () => {
    data = await d3.csv(`${base}/loc.csv`, row => ({
      ...row,
      line: Number(row.line),
      depth: Number(row.depth),
      length: Number(row.length),
      date: new Date(row.date + "T00:00" + row.timezone),
      datetime: new Date(row.datetime)
    }));

    commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
      let first = lines[0];
      let {author, date, time, timezone, datetime} = first;
      let ret = {
        id: commit,
        url: "https://github.com/mass-ave/my-portfolio/" + commit,
        author, date, time, timezone, datetime,
        hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
        totalLines: lines.length
      };

      Object.defineProperty(ret, "lines", {
        value: lines,
        configurable: true,
        writable: true,
        enumerable: false,
      });

      return ret;
    });
  });
  const authors = d3.groups(data, d => d.author).length + 1;
</script>
<h1>Meta</h1>
<dl class="stats">
	<dt>Total <abbr title="Lines of code">LOC</abbr>:</dt>
	<dd>{data.length}</dd>
  <dt>Total # of commits:</dt>
	<dd>{commits.length}</dd>
  <dt>Number of authors:</dt>
	<dd>{authors}</dd>
</dl>