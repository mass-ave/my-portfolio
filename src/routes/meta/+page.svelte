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

  let width = 1000, height = 600;

  $: minDate = d3.min(commits.map(d => d.date));
  $: maxDate = d3.max(commits.map(d => d.date));
  $: maxDatePlusOne = new Date(maxDate);
  $: maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

  $: xScale = d3.scaleTime()
                .domain([minDate, maxDatePlusOne])
                .range([0, width])
                .nice();

  $: yScale = d3.scaleLinear()
                .domain([24, 0])
                .range([height, 0]);

  let margin = {top: 10, right: 0, bottom: 0, left: 0};
  let usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left
  };
  usableArea.width = usableArea.right - usableArea.left;
  usableArea.height = usableArea.bottom - usableArea.top;

  let xAxis, yAxis;
  $: {
    d3.select(xAxis).call(d3.axisBottom(xScale));
    d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
  }

  let yAxisGridlines;
  $: {
    d3.select(yAxisGridlines).call(
      d3.axisLeft(yScale)
        .tickFormat("")
        .tickSize(-usableArea.width)
    );
  }

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
<svg viewBox="0 0 {width} {height}">
  <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
  <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
  <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
	<g class="dots">
    {#each commits as commit, index }
      <circle
        cx={ xScale(commit.datetime) }
        cy={ yScale(commit.hourFrac) }
        r="5"
        fill="steelblue"
      />
    {/each}
  </g>
</svg>
<style>
	svg {
		overflow: visible;
    padding: 1em;
	}

  .gridlines {
    stroke-opacity: .2;
  }
</style>
