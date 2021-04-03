import React from 'react';
import { Link } from 'react-router-dom';

import './Calendar.css';

export const RaceMiniatureMenu = ({ completeRouterPath }) => {
  return (
    <div className='race-miniature-menu'>
      <Link to={`${completeRouterPath}/results`}>
        <div className='race-miniature-menu__element'>
          <button>Wyniki</button>
        </div>
      </Link>
      <Link to={`${completeRouterPath}/reports`}>
        <div className='race-miniature-menu__element'>
          <button>Sędziowska</button>
        </div>
      </Link>
      <Link to={`${completeRouterPath}/discussion`}>
        <div className='race-miniature-menu__element'>
          <button>Dyskusje</button>
        </div>
      </Link>
      <Link to={`${completeRouterPath}/dotd`}>
        <div className='race-miniature-menu__element'>
          <button>Driver of the Day</button>
        </div>
      </Link>
      <Link to={`${completeRouterPath}/transmissions`}>
        <div className='race-miniature-menu__element'>
          <button>Transmisje</button>
        </div>
      </Link>
      <Link to={`${completeRouterPath}/replays`}>
        <div className='race-miniature-menu__element'>
          <button>Powtórki</button>
        </div>
      </Link>
    </div>
  );
};
