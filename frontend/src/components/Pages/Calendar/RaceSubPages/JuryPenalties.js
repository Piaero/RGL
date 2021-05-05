import React from 'react';
import './RaceSubPages.css';

const PenalizedDriver = ({ driver }) => {
  return (
    <div className='penalties__driver'>
      <h3>{driver.nick}</h3>
      <p>{driver.note}</p>
      {driver.seconds > 0 ? (
        <p>
          Kara czasowa:{' '}
          <span
            style={{
              color:
                driver.juryPenalties === null
                  ? null
                  : penaltiesColour(driver.seconds),
            }}
          >
            {driver.seconds}s
          </span>
        </p>
      ) : (
        <p>
          Anulowanie kary:{' '}
          <span
            style={{
              color:
                driver.juryPenalties === null
                  ? null
                  : penaltiesColour(driver.seconds),
            }}
          >
            {driver.seconds}s
          </span>
        </p>
      )}
      {driver.points ? (
        <p>
          Punkty karne:{' '}
          <span
            style={{
              color: 'red',
            }}
          >
            {driver.points}
          </span>
        </p>
      ) : null}
    </div>
  );
};

const penaltiesColour = (penaltyTime) => {
  return penaltyTime > 0 ? 'red' : '#00ff00';
};

export const JuryPenalties = ({ results }) => {
  let raceSessions = Object.keys(results.calendar.raceFormat);
  let sessionPenalties = [];

  for (const raceSession of raceSessions) {
    let selectedSession =
      results.calendar.races[0].adjustedResults[raceSession];

    for (const driver of selectedSession) {
      if (driver.juryPenalties !== null) {
        for (const driverPenalty of driver.juryPenalties) {
          let penalizedDriver = {};

          penalizedDriver.nick = driver.nick;
          penalizedDriver.seconds = driverPenalty.seconds;
          penalizedDriver.points = driverPenalty.points;
          penalizedDriver.note = driverPenalty.note;

          sessionPenalties.push(penalizedDriver);
        }
      }
    }
  }

  sessionPenalties.sort((a, b) => a.nick.localeCompare(b.nick));

  return (
    <section className='penalties__jury-penalties'>
      <h2>Statement sędziowski</h2>
      <p className='penalties__general-statement'>
        {results.calendar.races[0].results.statement}
      </p>
      {sessionPenalties.map((penalty, index) => {
        return <PenalizedDriver driver={penalty} key={index} />;
      })}
    </section>
  );
};
