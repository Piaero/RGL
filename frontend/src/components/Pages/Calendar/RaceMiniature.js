import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { formatDate } from '../../../utilities/formatDate.js';

export const RaceMiniature = ({ race }) => {
  return (
    <section className='race-miniature'>
      Runda {race.id}
      <br />
      {formatDate(race.date)}
    </section>
  );
};
