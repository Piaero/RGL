import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Standings = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Standings</h2>
      <h3>Standings Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
