import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Results = ({}) => {
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
  } else {
    return (
      <section>
        <h2>RaceId: {match.params.raceId}</h2>
        <h2>Division: {resultsDetails.division}</h2>
        Results Match Url is: {JSON.stringify(match)}
        <p>Results are {JSON.stringify(results)}</p>
      </section>
    );
  }
};
