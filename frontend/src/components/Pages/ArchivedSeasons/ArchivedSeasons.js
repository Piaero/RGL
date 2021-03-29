import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const ArchivedSeasons = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> ArchivedSeasons</h2>
      <h3>ArchivedSeasons Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
