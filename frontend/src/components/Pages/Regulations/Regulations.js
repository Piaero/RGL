import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Regulations = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Regulations</h2>
      <h3>Regulations Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
