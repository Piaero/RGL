import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { RaceMiniature } from './RaceMiniature.js';

export const Calendar = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/);
  let divisionString = division[0];

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    fetch(`/calendar?divisionString=${divisionString}`)
      .then((res) => res.json())
      .then((calendar) => setCalendar(calendar));
  }, []);

  if (calendar.length === 0) {
    return <section>Ładowanie kalendarza...</section>;
  } else {
    return (
      <section className='calendar-container'>
        {calendar?.calendar?.races?.map((race, index) => {
          return (
            <RaceMiniature race={race} key={index} routerPath={match.url} />
          );
        })}
      </section>
    );
  }
};
