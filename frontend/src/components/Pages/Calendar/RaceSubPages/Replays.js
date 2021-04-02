import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Replays = ({}) => {
  let match = useRouteMatch();

  return <section>Replays Match Url is: {match.url}</section>;
};
