import React from 'react';

import './RaceSubPages.css';

export const RaceResults = ({ raceSession, results }) => {
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
          {results.map((driver, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{driver.number}</td>
                <td>{driver.fullName}</td>
                <td>{driver.nick}</td>
                <td>{driver.team}</td>
                <td>
                  <img
                    src={require(`../../../../assets/teamLogo/${driver.teamLogo}.png`)}
                    alt={driver.team}
                    className='results__team-logo'
                  />
                </td>
                <td>{driver.bestTime}</td>
                <td>{driver.adjustedEventTime}</td>
                <td>{driver.startingPosition}</td>
                <td>{driver.startingPosition - index - 1}</td>
                <td>{driver.stops}</td>
                <td>
                  {driver.juryPenalties === 0 ? null : driver.juryPenalties}
                </td>
                <td>{driver.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
