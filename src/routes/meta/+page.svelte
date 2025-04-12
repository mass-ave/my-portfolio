<script>
  import * as d3 from "d3";
  import { base } from "$app/paths";
  import Bar from "$lib/Bar.svelte";
  import { onMount } from "svelte";
  import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

  let data = [];
  let commits = [];

  onMount(async () => {
    data = await d3.csv(`${base}/loc.csv`, (row) => ({
      ...row,
      line: Number(row.line),
      depth: Number(row.depth),
      length: Number(row.length),
      date: new Date(row.date + "T00:00" + row.timezone),
      datetime: new Date(row.datetime),
    }));

    commits = d3
      .groups(data, (d) => d.commit)
      .map(([commit, lines]) => {
        let first = lines[0];
        let { author, date, time, timezone, datetime } = first;
        let ret = {
          id: commit,
          url: "https://github.com/mass-ave/my-portfolio/" + commit,
          author,
          date,
          time,
          timezone,
          datetime,
          hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
          totalLines: lines.length,
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
  const authors = d3.groups(data, (d) => d.author).length + 1;

  let width = 1000,
    height = 600;

  $: minDate = d3.min(commits.map((d) => d.date));
  $: maxDate = d3.max(commits.map((d) => d.date));
  $: maxDatePlusOne = new Date(maxDate);
  $: maxDatePlusOne.setDate(maxDatePlusOne.getDate() + 1);

  $: xScale = d3
    .scaleTime()
    .domain([minDate, maxDatePlusOne])
    .range([0, width])
    .nice();

  $: yScale = d3.scaleLinear().domain([24, 0]).range([height, 0]);

  let margin = { top: 10, right: 0, bottom: 0, left: 0 };
  let usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
  };
  usableArea.width = usableArea.right - usableArea.left;
  usableArea.height = usableArea.bottom - usableArea.top;

  let xAxis, yAxis;
  $: {
    d3.select(xAxis).call(d3.axisBottom(xScale));
    d3.select(yAxis).call(
      d3
        .axisLeft(yScale)
        .tickFormat((d) => String(d % 24).padStart(2, "0") + ":00")
    );
  }

  let yAxisGridlines;
  $: {
    d3.select(yAxisGridlines).call(
      d3.axisLeft(yScale).tickFormat("").tickSize(-usableArea.width)
    );
  }

  let hoveredIndex = -1;
  $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};

  let commitTooltip;
  let clickedCommits = [];
  let cursor = { x: 0, y: 0 };
  let tooltipPosition = { x: 0, y: 0 };
  async function dotInteraction(index, evt) {
    let hoveredDot = evt.target;
    if (evt.type === "mouseenter") {
      hoveredIndex = index;
      cursor = { x: evt.x, y: evt.y };
      tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
        strategy: "fixed",
        middleware: [offset(5), autoPlacement()],
      });
    } else if (evt.type === "mouseleave") {
      hoveredIndex = -1;
    } else if (evt.type === "click") {
      let commit = commits[index];
      if (!clickedCommits.includes(commit)) {
        clickedCommits = [...clickedCommits, commit];
      } else {
        clickedCommits = clickedCommits.filter((c) => c !== commit);
      }
    }
  }

  $: allTypes = Array.from(new Set(data.map((d) => d.type)));
  $: selectedLines = (
    clickedCommits.length > 0 ? clickedCommits : commits
  ).flatMap((d) => d.lines);
  $: selectedCounts = d3.rollup(
    selectedLines,
    (v) => v.length,
    (d) => d.type
  );
  $: languageBreakdown = allTypes.map((type) => [
    type,
    selectedCounts.get(type) || 0,
  ]);
</script>

<svelte:head>
  <title>Meta</title>
</svelte:head>
<h1>Meta</h1>
<dl class="stats">
  <dt>Total <abbr title="Lines of code">LOC</abbr>:</dt>
  <dd>{data.length}</dd>
  <dt>Total # of commits:</dt>
  <dd>{commits.length}</dd>
  <dt>Number of authors:</dt>
  <dd>{authors}</dd>
</dl>
<dl
  class="info tooltip"
  hidden={hoveredIndex === -1}
  bind:this={commitTooltip}
  style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px"
>
  <dt>Commit</dt>
  <dd><a href={hoveredCommit.url} target="_blank">{hoveredCommit.id}</a></dd>

  <dt>Date</dt>
  <dd>{hoveredCommit.datetime?.toLocaleString("en", { dateStyle: "full" })}</dd>

  <dt>Time</dt>
  <dd>
    {hoveredCommit.datetime?.toLocaleTimeString("en", { timeStyle: "short" })}
  </dd>

  <dt>Author</dt>
  <dd>{hoveredCommit.author}</dd>

  <dt>Lines Edited</dt>
  <dd>{hoveredCommit.totalLines}</dd>
</dl>
<svg viewBox="0 0 {width} {height}">
  <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
  <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
  <g
    class="gridlines"
    transform="translate({usableArea.left}, 0)"
    bind:this={yAxisGridlines}
  />
  <g class="dots">
    {#each commits as commit, index}
      <circle
        on:mouseenter={(evt) => dotInteraction(index, evt)}
        on:mouseleave={(evt) => dotInteraction(index, evt)}
        on:click={(evt) => dotInteraction(index, evt)}
        class:selected={clickedCommits.includes(commit)}
        cx={xScale(commit.datetime)}
        cy={yScale(commit.hourFrac)}
        r="5"
        fill="steelblue"
      />
    {/each}
  </g>
</svg>
<Bar data={languageBreakdown} {width} />

<style>
  svg {
    overflow: visible;
    padding: 1em;
  }

  .gridlines {
    stroke-opacity: 0.2;
  }

  dl.info {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5em 1em;
    margin: 0;
    transition-duration: 500ms;
    transition-property: opacity, visibility;

    &[hidden]:not(:hover, :focus-within) {
      opacity: 0;
      visibility: hidden;
    }
  }

  .tooltip {
    position: fixed;
    top: 1em;
    left: 1em;
    background: goldenrod;
    padding: 1em;
    max-width: 500px;
    border-radius: 1em;
    box-shadow: 6px 6px 3px rgba(128, 128, 128, 0.5);
  }

  circle {
    transition: 200ms;
    transform-origin: center;
    transform-box: fill-box;
    &:hover {
      transform: scale(1.5);
    }
  }

  .selected {
    fill: var(--color-accent);
  }
</style>
