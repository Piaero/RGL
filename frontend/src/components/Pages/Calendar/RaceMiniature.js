import React, { useState } from 'react';

import { RaceMiniatureMenu } from './RaceMiniatureMenu.js';

import { formatDate } from '../../../utilities/formatDate.js';
import './Calendar.css';

export const RaceMiniature = ({ race, routerPath }) => {
  const [display, setDisplay] = useState('notdisplayed');
  const completeRouterPath =
    routerPath +
    '/' +
    race.country
      .toLowerCase()
      .replace(' ', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\u0142/g, 'l');

  const showHoverMenu = (e) => {
    e.preventDefault();
    setDisplay('displayed');
  };

  const hideHoverMenu = (e) => {
    e.preventDefault();
    setDisplay('notdisplayed');
  };

  return (
    <div
      className='race__miniature'
      onMouseEnter={(e) => showHoverMenu(e)}
      onMouseLeave={(e) => hideHoverMenu(e)}
    >
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
      <div className={display}>
        <RaceMiniatureMenu completeRouterPath={completeRouterPath} />
      </div>
    </div>
  );
};

const RaceWinners = ({ race }) => {
  return (
    <div className='race__winners-or-map race__podium-container'>
      <div className='podium__result position-2'>
        <div className='podium__background'></div>
        <p className='podium__name'>{race.results.race[2 - 1].name}</p>
      </div>
      <div className='podium__result position-1'>
        <div className='podium__background'></div>

        <p className='podium__name'>{race.results.race[1 - 1].name}</p>
      </div>
      <div className='podium__result position-3'>
        <div className='podium__background'></div>
        <p className='podium__name'>{race.results.race[3 - 1].name}</p>
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
