import React from 'react';

import './RaceSubPages.css';

export const RaceResults = ({ raceSession, results, pointsSystem }) => {
  return (
    <section>
      <h2>{raceSession}</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nr</th>
            <th>Kierowca</th>
            <th>Pseudonim</th>
            <th>Zespół</th>
            <th>Logo</th>
            <th>Najsz. okr.</th>
            <th>Czas</th>
            <th>Poz. start.</th>
            <th>Róż. poz</th>
            <th>Postoje</th>
            <th>Kary</th>
            <th>Pkt</th>
          </tr>
        </thead>

        <tbody>
          {console.log(results)}
          {results.map((driver, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>nr API</td>
                <td>nazwisko API API</td>
                <td>{driver.name}</td>
                <td>team API</td>
                <td>teamlogo API</td>
                <td>{driver.bestTime}</td>
                <td>{driver.adjustedEventTime}</td>
                <td>{driver.startingPosition}</td>
                <td>{driver.startingPosition - index - 1}</td>
                <td>{driver.stops}</td>
                <td>
                  {driver.juryPenalties === 0 ? null : driver.juryPenalties}
                </td>
                <td>{pointsSystem[index + 1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
