import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

export const Standings = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/)[0];

  const [season, setSeason] = useState([]);

  useEffect(() => {
    fetch(`/standings?division=${division}`)
      .then((res) => res.json())
      .then((calendar) => setSeason(calendar));
  }, []);

  if (season.length === 0) {
    return <section>Ładowanie klasyfikacji...</section>;
  } else {
    return (
      <section>
        <h2> Standings</h2>
        <h3>Standings Component</h3>
        Match Url is: {match.url}
        <br />
        Match path is: {match.path}
        <br />
        {JSON.stringify(season, null, 2)}
      </section>
    );
  }
};
