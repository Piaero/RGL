import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Dotd = ({}) => {
  let match = useRouteMatch();

  return <section>Dotd Match Url is: {match.url}</section>;
};
