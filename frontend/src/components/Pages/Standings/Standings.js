import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { DriversStandings } from './DriversStandings.js';
import { PenaltiesStandings } from './PenaltiesStandings.js';
import { TeamsStandings } from './TeamsStandings.js';

export const Standings = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/)[0];

  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch(`/standings?division=${division}`)
      .then((res) => res.json())
      .then((standings) => setStandings(standings));
  }, []);

  if (standings.length === 0) {
    return <section>Ładowanie klasyfikacji...</section>;
  } else {
    return (
      <section>
        <h2 className='race-details'>{standings.seasonName}</h2>
        <DriversStandings driversStandings={standings.drivers} />
        <TeamsStandings teamsStandings={standings.teams} />
        <PenaltiesStandings penaltiesStandings={standings.penalties} />
      </section>
    );
  }
};
