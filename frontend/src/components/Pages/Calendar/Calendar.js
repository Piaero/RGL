import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Calendar = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Calendar</h2>
      <h3>Calendar Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
