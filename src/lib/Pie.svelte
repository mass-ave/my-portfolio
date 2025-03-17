<script>
    import * as d3 from 'd3';

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    export let data = [];
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData;
    let arcs;
    $: {
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
    }
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    export let selectedIndex = -1;
</script>
<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path d={arc} fill={ colors(index) }
                class:selected={selectedIndex === index}
                on:click={e => selectedIndex = selectedIndex === index ? -1 : index} />
        {/each}

    </svg>
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>
<style>
    svg {
        max-width: 20em;
        margin-block: 2em;
        padding: 1em;

        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }

    svg:has(path:hover) path:not(:hover) {
        opacity: 50%;
    }

    path {
        transition: 300ms;
        cursor: pointer;
    }

    path:hover {
        opacity: 100% !important;
    }

    .selected {
        --color: oklch(60% 45% 0) !important;
        
        &:is(path) {
            fill: var(--color) !important;
        }
        
        &:is(li) {
            color: var(--color);
        }
    }

    ul:has(.selected) li:not(.selected) {
        color: gray;
    }

    .swatch {
        width: 8px;
        height: 8px;
        display: inline-block;
        background-color: var(--color);
        border-radius: 50%;
        margin: 0.5em;
    }

    .legend {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
        border: 1px solid black;
        flex: 1;
    }

    li {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        align-items: center;
    }
</style>
