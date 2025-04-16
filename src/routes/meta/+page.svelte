<script>
  import * as d3 from "d3";
  import { base } from "$app/paths";
  import Bar from "$lib/Bar.svelte";
  import StackedBar from "$lib/StackedBar.svelte";
  import FileLines from "$lib/FileLines.svelte";
  import Scrolly from "svelte-scrolly";
  import { onMount } from "svelte";
  import { computePosition, autoPlacement, offset } from "@floating-ui/dom";

  let data = [];
  let commits = [];
  let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

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

  let commitProgress = 100;
  $: timeScale = d3.scaleTime(
    d3.extent(commits, (d) => d.datetime),
    [0, 100]
  );

  $: commitMaxTime = timeScale.invert(commitProgress);
  $: dateTime = commitMaxTime.toLocaleString("en", {
    dateStyle: "long",
    timeStyle: "short",
  });

  $: filteredCommits = commits.filter(
    (commit) => commit.datetime <= commitMaxTime
  );

  $: filteredLines = data.filter((dat) => dat.datetime <= commitMaxTime);

  const authors = d3.groups(data, (d) => d.author).length + 1;

  let width = 1000,
    height = 600;

  $: minDate = d3.min(filteredCommits.map((d) => d.date));
  $: maxDate = d3.max(filteredCommits.map((d) => d.date));
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
  $: hoveredCommit = filteredCommits[hoveredIndex] ?? hoveredCommit ?? {};

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
      let commit = filteredCommits[index];
      if (!clickedCommits.includes(commit)) {
        clickedCommits = [...clickedCommits, commit];
      } else {
        clickedCommits = clickedCommits.filter((c) => c !== commit);
      }
    }
  }

  $: allTypes = Array.from(new Set(data.map((d) => d.type)));
  $: selectedLines = (
    clickedCommits.length > 0 ? clickedCommits : filteredCommits
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
<Scrolly bind:progress={commitProgress}>
  {#each commits as commit, index}
    <p align="justify">
      On {commit.datetime.toLocaleString("en", {
        dateStyle: "full",
        timeStyle: "short",
      })},
      {index === 0
        ? "I made my first mark in the code, a small step that kicked things off. You can check it out "
        : "I dropped another commit into the mix, part of the rhythm of this growing project. See it "}
      <a href={commit.url} target="_blank">here</a>. It touched {commit.totalLines}
      lines across {d3.rollups(
        commit.lines,
        (D) => D.length,
        (d) => d.file
      ).length} file(s). Just bits and pieces, edits and tweaks—but all part of the
      story we're building, one commit at a time.
    </p>

    <hr />
  {/each}
  <svelte:fragment slot="viz">
    <svg viewBox="0 0 {width} {height}">
      <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
      <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
      <g
        class="gridlines"
        transform="translate({usableArea.left}, 0)"
        bind:this={yAxisGridlines}
      />
      <g class="dots">
        {#each filteredCommits as commit, index (commit.id)}
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
    <StackedBar data={languageBreakdown} {width} {colorScale} />
  </svelte:fragment>
</Scrolly>

<Scrolly bind:progress={commitProgress} --scrolly-layout="viz-first">
  {#each commits as commit, index}
    <p align="justify">
      On {commit.datetime.toLocaleString("en", {
        dateStyle: "full",
        timeStyle: "short",
      })}, I committed changes that impacted{" "}
      {d3.rollups(
        commit.lines,
        (D) => D.length,
        (d) => d.file
      ).length}{" "}
      file(s).
    </p>
    <hr />
  {/each}
  <svelte:fragment slot="viz">
    <FileLines
      lines={filteredLines}
      {width}
      svgWidth={0.8 * width}
      {colorScale}
    />
  </svelte:fragment>
</Scrolly>

<style>
  :global(body) {
    max-width: min(120ch, 80vw);
  }

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
    @starting-style {
      r: 0;
    }
  }

  .selected {
    fill: var(--color-accent);
  }

  .slider-container {
    display: grid;
    max-width: 500px;
    display: flex;
    flex: 1;
    white-space: nowrap;
  }
</style>
