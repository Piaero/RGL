import React from 'react';

import './RaceSubPages.css';

export const RaceResults = ({ raceSession, results }) => {
  return (
    <section>
      <h2>{raceSession}</h2>
      <p>------------------</p>
      <p>{JSON.stringify(results)}</p>
    </section>
  );
};
