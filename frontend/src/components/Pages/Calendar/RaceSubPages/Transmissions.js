import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Transmissions = ({}) => {
  let match = useRouteMatch();

  return <section>Transmissions Match Url is: {match.url}</section>;
};
