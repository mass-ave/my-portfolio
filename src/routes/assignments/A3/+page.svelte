
    <header>
      <h1>
        <small>Assignment 3</small>
        Visualization Critique & Redesign
      </h1>

      <p><strong>Kevin E. Acevedo Jetter</strong> — <em>acevedo@mit.edu</em></p>
    </header>

    <main>
      <section>
        <h2>Reading & Critique</h2>

        <figure>
          <img
            width="100%"
            src="https://vis-society.github.io/assets/imgs/covid-spiral.png"
            alt="NYT's visualization"
          />
        </figure>

        <p align="justify">Insights about the data/visualization:</p>

        <ul>
          <li>
            We can see that the data starts in March 2020 and ends in early
            January 2022 and the cases are the 7-day average of the data.
          </li>
          <li>
            The thickness specified in the "legend" is from 0 to 150k cases,
            which is an interesting number to choose since we can see parts
            where the scale is way bigger than 150k cases.
          </li>
          <li>
            We can see the spikes in cases is usually during the winter, my
            theory being since everyone spends time inside because of the cold.
          </li>
        </ul>

        <p align="justify">Design Critique:</p>

        <ul>
          <li>
            The width specified in the "legend" is from 0 to 150k cases, for
            everything else you would have to take an educated guess or use a
            ruler to measure the distance and then do math to get an estimate.
            This is not a good technique since it may lead to misinformation and
            is simply just making the life of the reader harder since they need
            to do more work.
          </li>
          <li>
            Having the center of the circle not be in the middle of the
            visualization might not help convince the reader that this is a real
            visualization made with real data. Think about it as a magic trick,
            usually the ones that are more sophisticated work better than other
            that do not look well executed.
          </li>
          <li>
            Another problem I can see is that as the years pass, the size of
            each month in the visualization gets bigger and bigger making visual
            comparisons between years more difficult. People might think that
            since it is bigger it means there are more cases... or other
            scenarios.
          </li>
          <li>
            A friend of mine saw this visualization on my computer and their
            first reaction was: "what is that and why does it look bad?". This
            is a good example that shows that people are not likely to
            understand the visualization completely.
          </li>
          <li>
            I believe more text should be added to the visualization that
            explains what is going in the image and how to understand completely
            the visualization.
          </li>

          <li>
            The beginning of the spiral is also not even painted with the
            red/pink they use since the data is 0 for that time and I think it
            shouldn't be used for the visualization.
          </li>
        </ul>
      </section>

      <section>
        <h2>Visualization Sketches</h2>

        <figure>
          <img
            width="100%"
            src="../../images/A3/vis1.jpg"
            alt="Line Chart of the whole data"
          />
          <figcaption>
            This line chart is made using the 7-day average of the new_confirmed
            cases.
          </figcaption>
        </figure>

        <p align="justify">
          Note: This visualization is just a sketch and is not even close to
          perfect, it is just a rough draft and a way to brainstorm for the
          final visualization design.
        </p>

        <p align="justify">Design Rationale for Sketch 1:</p>

        <ul>
          <li>
            When I saw the spiral visualization, the first thing I thought was
            if a normal and simpler linear chart will be better to show the data
            and to understand the purpose of the visualization.
          </li>
          <li>
            As the y-axis, I used the 7-day average of new_confirmed cases which
            is the same the original visualization was using and the x-axis had
            the dates we can see in the data.
          </li>
          <li>
            This visualization definitely helped improve the way one understands
            the data, but I believed it didn't show the changes in year by
            month, which leads to my next visualization.
          </li>
        </ul>

        <figure>
          <img
            width="100%"
            src="../../images/A3/vis2.jpg"
            alt="Line Chart of each year, by month, over each other"
          />
          <figcaption>
            Line Chart of the data, divided by years and to highlight the
            changes by month
          </figcaption>
        </figure>

        <p align="justify">
          Note: This visualization is just a sketch and is not even close to
          perfect, it is just a rough draft and a way to brainstorm for the
          final visualization design.
        </p>

        <p align="justify">Design Rationale for Sketch 2:</p>

        <ul>
          <li>
            This visualization was made to show the changes in year by month. I
            used the average of the 7-day average of all the days of the month.
          </li>
          <li>
            As the y-axis, I used the average of the monthly 7-day averages of
            new_confirmed cases and organized by year and the x-axis has the
            months of the year. I then stacked the three linear charts to see
            the difference each year by month.
          </li>
          <li>
            This was a better visualization than the previous one since it shows
            when in the year it was usually the highest newly confirmed cases of
            COVID-19. It still had room for improvement, which lead to my third
            visualization, a bubble chart.
          </li>
        </ul>

        <figure>
          <img
            width="100%"
            src="../../images/A3/vis3.jpg"
            alt="Bubble Chart of the data by month"
          />
          <figcaption>
            Bubble Chart of the data, divided by months (from 01/2020 to
            09/2022)
          </figcaption>
        </figure>

        <p align="justify">
          Note: This visualization is just a sketch and is not even close to
          perfect, it is just a rough draft and a way to brainstorm for the
          final visualization design.
        </p>

        <p align="justify">Design Rationale for Sketch 3:</p>

        <ul>
          <li>
            The reason to make this visualization is to appreciate more the
            magnitude of the months that had a lot more of newly confirmed
            cases. Not all months are showed in the chart (it would've taken too
            much time) and the scales of the circles are not the best, problems
            from making the charts by hand.
          </li>
          <li>
            Like it says in the visualization, this can be improved if I had
            colors to represent the months (ex: January = Red, February = Blue,
            etc.) so the magnitude of the months could be seen with less work.
            We could also group them by seasons of the year and see that change
            during the years.
          </li>
          <li>
            I believe this is a great way to improve the design of the original
            visualization since it will be more comprehensible to the reader.
          </li>
        </ul>
      </section>

      <section>
        <h2>Final Visualization Design</h2>

        <figure>
          <img
            width="100%"
            src="../../images/A3/vis4.png"
            alt="Bubble Chart, divided by months (from 01/2020 to
          09/2022)"
          />
          <figcaption>
            Bubble Chart of the data, divided by months (from 01/2020 to
            09/2022)
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Design Process & Design Decisions</h2>

        <p align="justify">
          First, I added a column to the original data (which can be found
          <a href="./data/COVID_US_cases.csv">here</a>) which has the average of
          the last seven days of newly confirmed cases for each day in the data.
          I used Python (the <code>pandas</code> library) to make the
          calculation and add the column to the data and save the data to a new
          csv file which can be found
          <a href="./data/data-with-average.csv">here</a>. The code for this
          process can be found <a href="./analyze-data.py">here</a>. I also did
          not use the last data point shown in the original data since it has a
          negative number of newly confirmed cases and the date is not
          continuous with the rest of the data. From the different
          visualizations I made on pen and paper, I felt the one that best
          expressed the data from the original visualization from the NYT was
          the Bubble Chart. My visualization attempts to answer the question
          "Which months have had the most newly confirmed cases on average?"
          while it still shows the same data from the NYT visualization. For the
          visualization, I used a different color for each month of the year,
          for any reader to see that in specific months of the year, the new
          cases went up consistently. I used a Bubble Chart since it shows the
          magnitude of each month in an easy-to-understand way. The size of the
          circles are the reflection of the number inside the circle which is
          the average of the new cases. One thing I tried adjusting, but it
          messed the order of the circles was the order of the months in the
          legend. That is one part I wish I could fix without changing the order
          of the bubbles.
        </p>

        <h3>Reflection</h3>

        <p align="justify">
          I had six main critiques when I made step 2 and those are: width being
          max 150k cases, center of the circle not being in the center, the
          months size in the NYT visualization was changing after each year,
          visualization appeal, original visualization having a bad title and
          legend, and finally, they added months that had data values being 0. I
          believe that the Bubble Chart effectively covers all my critiques by
          doing the following: not limiting the scale to be 150k new cases in
          average but allowing the maximum, it has the chart centered, all the
          months now change according to the average new cases for that month,
          bubble charts are fun and appealing to read, the title is descriptive,
          and the legend has all the months of the year (only bad thing about
          this is that they are not in order, I couldn't figure how to do it
          without changing the configuration of the bubbles), and I only
          included months in the chart that had nonzero positive data. Critique
          by redesign was for sure a helpful way to identify challenges of
          communicating the data in the NYT visualization. There were definitely
          tradeoffs for each of the visualization, but I believe that the Bubble
          Chart was the best one to interpret the data.
        </p>

        <p align="justify">
          One follow-up question that came from this assignment is
          <i
            >What was the mask mandate for the county/town that the reported
            cases come from?
          </i>
          I think also the rate of test per person might be an interesting
          visualization that could arise from this question.
        </p>
      </section>
    </main>

    <style>
      @import "../../../../static/data-vis.css";
    </style>