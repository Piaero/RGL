import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import NotFoundImage from '../../../assets/image/NotFound.jpg';

import './NotFound.css';

export const NotFound = () => {
  let match = useRouteMatch();

  return (
    <section className='content'>
      <div>
        <h2> Not Found</h2>
        <h3>Not Found Component</h3>
        Match Url is: {match.url}
        <br />
        Match path is: {match.path}
        <br />
        <img
          className='not-found'
          src={NotFoundImage}
          alt='404: Page not found'
        />
      </div>
    </section>
  );
};
