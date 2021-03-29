import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

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

  if (!calendar.length) {
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
      </section>
    );
  }
};
