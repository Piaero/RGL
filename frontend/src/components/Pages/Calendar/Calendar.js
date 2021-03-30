import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RaceMiniature } from './RaceMiniature.js';

export const Calendar = () => {
  let match = useRouteMatch();

  const [calendar, setCalendar] = useState([]);

  let division = match.url.match(/[^/]+/);
  let divisionString = division[0];

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ divisionString }),
    };

    fetch('/calendar', requestOptions)
      .then((res) => res.json())
      .then((calendar) => setCalendar(calendar));
  }, []);

  if (calendar.length === 0) {
    return <section>Ładowanie kalendarza...</section>;
  } else {
    return (
      <section>
        <h2> Calendar</h2>
        <h3>Calendar Component</h3>
        Match Url is: {match.url}
        <br />
        Match path is: {match.path}
        <br />
        {console.log(calendar)}
        {calendar.pages.calendar.races.map((race, index) => {
          return <RaceMiniature race={race} key={index} />;
        })}
      </section>
    );
  }
};
