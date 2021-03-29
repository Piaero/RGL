import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Announcements = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Announcements</h2>
      <h3>Announcements Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
