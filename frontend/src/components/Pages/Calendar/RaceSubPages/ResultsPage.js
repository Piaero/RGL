import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RaceResults } from './RaceResults.js';

import './RaceSubPages.css';

export const ResultsPage = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/);
  let resultsDetails = {
    division: division[0],
    country: match.params.raceId.replace('-', ' '),
  };

  const [results, setResults] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultsDetails }),
    };

    fetch('/race-results', requestOptions)
      .then((res) => res.json())
      .then((results) => setResults(results));
  }, []);

  if (results.length === 0) {
    return <section>Ładowanie wyników...</section>;
  } else if (results.seasons.races[0].results === null) {
    return <section>Wyniki nie są jeszcze dostępne</section>;
  } else {
    return (
      <section>
        <h2>RaceId: {match.params.raceId}</h2>
        <h2>Division: {resultsDetails.division}</h2>
        Results Match Url is: {JSON.stringify(match)}
        <p>------------------</p>
        <p>{JSON.stringify(results.seasons.races)}</p>
        <p>------------------</p>
        <p>{Object.keys(results.seasons.raceFormat)}</p>
        <p>------------------</p>
        {Object.keys(results.seasons.raceFormat).map((raceSession, index) => {
          return (
            <RaceResults
              raceSession={results.seasons.raceFormat[raceSession].name}
              results={results.seasons.races[0].adjustedResults[raceSession]}
              pointsSystem={
                results.seasons.raceFormat[raceSession].pointsSystem
              }
              key={index}
            />
          );
        })}
      </section>
    );
  }
};
