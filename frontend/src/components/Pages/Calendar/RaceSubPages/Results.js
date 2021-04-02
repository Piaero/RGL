import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import './RaceSubPages.css';

export const Results = ({}) => {
  let match = useRouteMatch();

  return <section>Results Match Url is: {match.url}</section>;
};
