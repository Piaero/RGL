import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Join = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Join</h2>
      <h3>Join Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
