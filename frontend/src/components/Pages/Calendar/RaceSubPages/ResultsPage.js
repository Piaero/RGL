import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RaceResults } from './RaceResults.js';
import { RaceDetails } from './RaceDetails.js';

import './RaceSubPages.css';

export const ResultsPage = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/);
  let country = match.params.raceId.replace('-', ' ');

  const [results, setResults] = useState([]);

  let raceDetails = {
    venue: results?.calendar?.races[0]?.venue,
    date: results?.calendar?.races[0]?.date,
    circuit: results?.calendar?.races[0]?.circuit,
    division: division[0],
    seasonName: results?.calendar?.seasonName,
  };

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
        <RaceDetails raceDetails={raceDetails} />
        {Object.keys(results.calendar.raceFormat).map((raceSession, index) => {
          return (
            <RaceResults
              raceSession={results.calendar.raceFormat[raceSession].name}
              results={results.calendar.races[0].adjustedResults[raceSession]}
              key={index}
            />
          );
        })}
      </section>
    );
  }
};
