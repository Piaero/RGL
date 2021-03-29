import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Races = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Races</h2>
      <h3>Races Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
