import React from 'react';
import { stylingLogic } from '../../../../utilities/stylingLogic.js';
import './RaceResults.css';

export const RaceResults = ({ raceSession, results }) => {
  const positionsGainedImage = (startingPosition, finishedPosition) => {
    if (startingPosition > finishedPosition) {
      return (
        <img
          src={require(`../../../../assets/layout/up.png`)}
          alt='Pozycje zyskane.'
          className='results__position-change-image'
        />
      );
    } else if (startingPosition < finishedPosition) {
      return (
        <img
          src={require(`../../../../assets/layout/down.png`)}
          alt='Pozycje stracone.'
          className='results__position-change-image'
        />
      );
    } else {
      return (
        <img
          src={require(`../../../../assets/layout/no-change.png`)}
          alt='Pozycja utrzymana'
          className='results__position-change-image'
        />
      );
    }
  };

  const penaltiesColour = (penaltyTime) => {
    return penaltyTime > 0 ? 'red' : '#00ff00';
  };

  return (
    <section className='results'>
      <h2>{raceSession}</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nr</th>
            <th>Kierowca</th>
            <th>Pseudonim</th>
            <th className='team-logo'></th>
            <th className='team-stripe'></th>
            <th>Zespół</th>
            <th>Najsz. okr.</th>
            <th>Różnica</th>
            {raceSession !== 'Kwalifikacje' ? <th>Poz. start.</th> : null}
            {raceSession !== 'Kwalifikacje' ? (
              <th className='results__thead__stops'>Postoje</th>
            ) : null}
            {raceSession !== 'Kwalifikacje' ? (
              <th className='results__thead__penalties'>Kary</th>
            ) : null}
            <th className='results__thead__points'>Pkt</th>
          </tr>
        </thead>

        <tbody>
          {results.map((driver, index) => {
            const penaltyTime = () => {
              if (!driver.juryPenalties) {
                return null;
              } else {
                return driver.juryPenalties.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.seconds,
                  0
                );
              }
            };

            return (
              <tr key={index}>
                <td
                  className='results__position'
                  style={{
                    backgroundColor: stylingLogic.podiumColours(index + 1),
                  }}
                >
                  {index + 1}
                </td>

                <td
                  className='results__number'
                  style={{
                    color: driver.teamColour,
                    textShadow: `0px 0px 4px ${driver.teamColour}, 1px 0 black, 0 1px black, -1px 0 black, 0 -1px black`,
                  }}
                >
                  {driver.number}
                </td>
                <td className='results__full-name'>{driver.fullName}</td>
                <td className='results__nick'>{driver.nick}</td>
                <td>
                  <img
                    src={require(`../../../../assets/teamLogo/${driver.teamLogo}`)}
                    alt={driver.team}
                    className='results__team-logo'
                  />
                </td>
                <td>
                  <div
                    className='results__team-stripe'
                    style={{ background: driver.teamColour }}
                  ></div>
                </td>
                <td className='results__team-name'>{driver.team}</td>
                <td
                  className='results__best-time'
                  style={driver.fastestLap ? { color: '#B803FF' } : null}
                >
                  {driver.bestTime}
                </td>
                <td className='results__event-time'>
                  {driver.adjustedEventTime}
                </td>
                {raceSession !== 'Kwalifikacje' ? (
                  <td className='results__starting-position-container'>
                    <span className='results__starting-position'>
                      {driver.startingPosition}
                    </span>
                    <span className='results__starting-position-change-and-icon'>
                      <div className='results__position-change-image-container'>
                        {positionsGainedImage(
                          driver.startingPosition,
                          index + 1
                        )}
                      </div>
                      <span className='results__position-change'>
                        {driver.startingPosition - index - 1}
                      </span>
                    </span>
                  </td>
                ) : null}
                {raceSession !== 'Kwalifikacje' ? (
                  <td className='results__stops'>{driver.stops}</td>
                ) : null}
                {raceSession !== 'Kwalifikacje' ? (
                  <td
                    className='results__penalties'
                    style={{
                      color:
                        driver.juryPenalties === null || 0
                          ? null
                          : penaltiesColour(penaltyTime()),
                    }}
                  >
                    {driver.juryPenalties === null || penaltyTime() === 0
                      ? null
                      : penaltyTime() + 's'}
                  </td>
                ) : null}
                <td className='results__points'>{driver.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
