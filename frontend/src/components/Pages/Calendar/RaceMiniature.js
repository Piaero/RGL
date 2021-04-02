import React from 'react';

import './Calendar.css';

import { formatDate } from '../../../utilities/formatDate.js';

export const RaceMiniature = ({ race }) => {
  return (
    <section className='race__miniature'>
      <p> Runda {race.id}</p>
      <p>{formatDate.date(race.date)}</p>
      <div className='race__venue-and-flag'>
        <img
          src={require(`../../../assets/flags_64/${race.countryCode}.png`)}
          alt={race.venue}
          className='race__flag'
        />
        <p className='race__venue'>{race.venue}</p>
      </div>
      {race.results ? <RaceWinners race={race} /> : <RaceMap race={race} />}
    </section>
  );
};

const RaceWinners = ({ race }) => {
  return (
    <div className='race__winners-or-map race__podium-container'>
      <div className='podium__result position-2'>
        <div className='podium__background'></div>
        <p className='podium__name'>{race.results.race[2].name}</p>
      </div>
      <div className='podium__result position-1'>
        <div className='podium__background'></div>

        <p className='podium__name'>{race.results.race[1].name}</p>
      </div>
      <div className='podium__result position-3'>
        <div className='podium__background'></div>
        <p className='podium__name'>{race.results.race[3].name}</p>
      </div>
    </div>
  );
};

const RaceMap = ({ race }) => {
  return (
    <div className='race__winners-or-map'>
      <img
        src={require(`../../../assets/circuit-maps/simple/${race.map}`)}
        alt={race.venue}
        className='race__map'
      />
    </div>
  );
};
