import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RaceResults } from './RaceResults.js';

import './RaceSubPages.css';

export const ResultsPage = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/);
  let country = match.params.raceId.replace('-', ' ');

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/race-results?division=${division[0]}&country=${country}`)
      .then((res) => res.json())
      .then((results) => setResults(results));
  }, []);

  if (results.length === 0) {
    return <section>Ładowanie wyników...</section>;
  } else if (results.calendar.races[0].results === null) {
    return <section>Wyniki nie są jeszcze dostępne</section>;
  } else {
    return (
      <section>
        <h2>RaceId: {match.params.raceId}</h2>
        <h2>Division: {division[0]}</h2>
        Results Match Url is: {JSON.stringify(match)}
        <p>------------------</p>
        <p>{JSON.stringify(results.calendar.raceFormat)}</p>
        <p>------------------</p>
        <p>{Object.keys(results.calendar.raceFormat)}</p>
        <p>------------------</p>
        {Object.keys(results.calendar.raceFormat).map((raceSession, index) => {
          return (
            <RaceResults
              raceSession={results.calendar.raceFormat[raceSession].name}
              results={results.calendar.races[0].adjustedResults[raceSession]}
              pointsSystem={
                results.calendar.raceFormat[raceSession].pointsSystem
              }
              key={index}
            />
          );
        })}
      </section>
    );
  }
};
