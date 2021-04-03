import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Reports = ({}) => {
  let match = useRouteMatch();

  return <section>Reports Match Url is: {match.url}</section>;
};
