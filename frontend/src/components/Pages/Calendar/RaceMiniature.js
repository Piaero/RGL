import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import './Calendar.css';

import { formatDate } from '../../../utilities/formatDate.js';

const WinnersOrMap = ({ race }) => {
  if (race.results) {
    return (
      <div>
        <ul>
          <li>{race.results.race[2].name}</li>
          <li>{race.results.race[1].name}</li>
          <li>{race.results.race[3].name}</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <img
          src={require(`../../../assets/circuit-maps/${race.map}`)}
          alt={race.venue}
          className='race__map'
        />
      </div>
    );
  }
};

export const RaceMiniature = ({ race }) => {
  return (
    <section className='race__miniature'>
      <p> Runda {race.id}</p>
      <p>{formatDate.date(race.date)}</p>
      <p>
        {race.country}
        <img
          src={require(`../../../assets/flags_64/${race.countryCode}.png`)}
          alt={race.venue}
          className='race__country'
        />
      </p>
      <p> {race.venue}</p>
      <WinnersOrMap race={race} />
    </section>
  );
};
