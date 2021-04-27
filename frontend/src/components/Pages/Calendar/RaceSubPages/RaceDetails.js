import React from 'react';
import { formatDate } from '../../../../utilities/formatDate.js';
import './RaceSubPages.css';

export const RaceDetails = ({ raceDetails }) => {
  return (
    <section className='race-details'>
      <p>
        {raceDetails.division} {raceDetails.seasonName}
      </p>
      <p>
        {raceDetails.venue} - Tor {raceDetails.circuit}
      </p>
      <p> {formatDate.date(raceDetails.date)}</p>
    </section>
  );
};
