import React from 'react';
import { Link } from 'react-router-dom';

import './Calendar.css';

export const RaceMiniatureHover = ({ display, completeRouterPath }) => {
  return (
    <div className={`${display}`}>
      <Link to={`${completeRouterPath}/results`}>
        <button>Wyniki</button>
      </Link>
      <Link to={`${completeRouterPath}/reports`}>
        <button>Sędziowska</button>
      </Link>
      <Link to={`${completeRouterPath}/discussion`}>
        <button>Dyskusje</button>
      </Link>
      <Link to={`${completeRouterPath}/dotd`}>
        <button>Driver of the Day</button>
      </Link>
      <Link to={`${completeRouterPath}/transmissions`}>
        <button>Transmisje</button>
      </Link>
      <Link to={`${completeRouterPath}/replays`}>
        <button>Powtórki</button>
      </Link>
    </div>
  );
};
