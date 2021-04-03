import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Discussion = ({}) => {
  let match = useRouteMatch();

  return <section>Discussion Match Url is: {match.url}</section>;
};
