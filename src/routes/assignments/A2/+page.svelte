<header>
    <h1>
      <small>Assignment 2</small>
      Exploratory Data Analysis
    </h1>

    <p><strong>Kevin E. Acevedo Jetter</strong> — <em>acevedo@mit.edu</em></p>
  </header>
  <main>
    <section>
      <h2>Subtheme: Corporate Landlords & Evictions</h2>

      <h3>Overall Analysis Questions</h3>
      <ol>
        <li>
          Is there a relationship between the rate of corporate landlord and
          residential landlord throughout the years in Boston's neighborhoods?
        </li>
        <li>
          Which neighborhoods have had the biggest change from resident
          landlord to corporate landlord in the last 20 years?
        </li>
        <li>
          Which communities live in the neighborhoods where the biggest change
          from resident landlord to corporate landlord in the last 20 years
          occured?
        </li>
      </ol>
    </section>

    <section>
      <h2>Reasons to choose this subtheme</h2>

      <p align="justify">
        In the readings and the page of the class that talks about
        <a href="https://vis-society.github.io/theme/evictions.html"
          >corporate landlords and evictions</a
        >, we can see that it mentions multiple times how communities of
        color, especially Black and Latinx people, are the ones that face a
        higher eviction rate. In this assignment, I will use the data provided
        by the course to show which neighborhoods of Boston are most affected
        by corporate landlord compared to resident landlord and which
        communities are part of those neighborhoods. I will also be looking at
        which neighborhoods have changed the landlords from residential to
        corporate in the last 20 years and look as well at which communities
        are part of those neighborhoods. All the questions were made to see,
        with the visualizations shown below, how much the Black and Latinx
        communities are affected.
      </p>
    </section>

    <section>
      <h2>Discoveries & Insights</h2>

      <p align="justify">
        First, note that the file
        <code>Corp_Ownership_and_Occupancy_Over_Time.csv</code>
        is a partition of the first four columns of
        <code>Census_and_Corp_Ownership_and_Occupancy_Over_Time.csv</code>.
        The file that has all the data (the one that was partitioned), from
        this point forward, will be referred as the <b>complete file</b>. For
        this project, we only need the complete file and the file we are given
        with the zip codes of the Boston neighborhoods
        (<code>Boston_Neighborhoods_Zipcodes.csv</code>) to create the map in
        Tableau. I couldn't have two different datasets in one, so I had to
        merge the zip code file with the complete file, using pandas. Some
        neighborhoods in the complete file do not appear in the zip codes file
        making the map not complete in figure 4. The order of the columns in
        the complete file do not make sense for a reader, but we do not have
        to reorder them for this project since we are using Tableau to create
        visualizations and the order of the data does not matter.
      </p>

      <p align="justify">
        Important to note that the first two visualization do not use
        percentage and the other visualizations do use percentage.
      </p>

      <figure>
        <img
          width="100%"
          src="../../images/A2/img1.png"
          alt="rate of corp and own ownership by neighborhood and year"
        />
        <figcaption>
          With the data we have in the complete file, we create a
          visualization that has in the same graph the rate of corporate and
          resident landlord. In this first visualization, we can see how the
          corporate landlord rate has increased in all the neighborhoods in
          the last 20 years. With the residential landlord, we can see that it
          mainly decreases or stays relatively the same in the span of 20
          years. I believe the relationship is that corporate landlords are
          increasing while the residential landlords are doing the opposite
          throughout the years, but we can see the actual numbers on the next
          figure.
        </figcaption>
      </figure>

      <figure>
        <img
          width="100%"
          src="../../images/A2/img2.png"
          alt="difference between corp and own ownership by neighborhood and year"
        />
        <figcaption>
          This second visualization was to see how the corporate landlord and
          residential landlord have changed throughout the 20 years. Instead
          of seeing both graphs, one over the other, we calculate the change
          with their subtraction. This graph does not make it clear, but the
          calculation is the following:
          <code>corporate landlord - residential landlord</code>. We can see
          that in some neighborhoods corporate landlord rate is already bigger
          than residential landlord rate. But most importantly, we can see
          that throughout the years and in every neighborhood there is a
          tendency of increase in this subtraction that we calculate, meaning
          that eventually, if no actions are taken, corporate landlord will
          have a higher rate than residential landlord.
        </figcaption>
      </figure>

      <figure>
        <img
          width="100%"
          src="../../images/A2/img3.png"
          alt="percentage of black and latinx population by neighborhood as a bar graph"
        />
        <figcaption>
          This bar graph was made with the purpose of identifying the
          neighborhoods were the communities mentioned in the readings and the
          page of the class, black and latinx, have a larger community. We can
          see that some of those neighborhoods are Mattapan, Roxbury, Hyde
          Park, Dorchester, and East Boston. With Figure 2, we can see that
          these neighborhoods are included in the neighborhoods that are
          affected by landlords becoming corporations instead of residents.
        </figcaption>
      </figure>

      <figure>
        <img
          width="100%"
          src="../../images/A2/img4.png"
          alt="percentage of black and latinx population by neighborhood as a map"
        />
        <figcaption>
          This map is similar to Figure 3, but shown from a different
          perspective. It shows were the black and latinx communities have a
          big presence, which is mainly in the southern and east part of
          Boston.
        </figcaption>
      </figure>
    </section>

    <section>
      <h2>Further Questions</h2>

      <p align="justify">
        The data given does not include eviction data. With the data we have
        and news articles, we might be able to create some hypothesis of what
        the trend is probably like. Once the eviction data is available, it
        will be easy to prove or disprove the hypothesis. Some possible next
        questions that come from this assignment are:
      </p>
      <ol>
        <li>Where do evictions occur more frequently?</li>
        <li>
          Which communities live in the neighborhoods where evictions occur
          the most?
        </li>
        <li>
          Do Corporate Landlords evict more people than Residential landlords?
        </li>
        <li>
          Which communities live in the neighborhoods where Corporate
          Landlords evict more people than Residential landlords?
        </li>
      </ol>
    </section>

    <section>
      <h2>Summary</h2>

      <p align="justify">
        With the data available, different studies can be seen. First, we saw
        the corporate landlord rate and residential landlord rate in a single
        graph for each neighborhood throughout 20 years. Then, we saw the
        difference of corporate landlord rate and residential landlord rate
        for each neighborhood throughout 20 years and with that made
        assumptions and further questions. Finally, we saw where the black and
        latinx communities live in the neighborhoods of Boston and made both a
        bar graph and a map to show the distribution. It will be lovely to
        have the eviction rate data to finish the purpose of this analysis.
      </p>
    </section>
  </main>

<style>
  @import "../../../../static/data-vis.css";
</style>