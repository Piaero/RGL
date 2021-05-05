import React from 'react';
import './RaceSubPages.css';

const PenalizedDriver = ({ driver }) => {
  return (
    <div className='penalties__driver'>
      <h4>{driver.nick}</h4>
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

const isPenalties = (penalties) => {
  for (var session in penalties) {
    if (penalties[session].length !== 0) return false;
  }
  return true;
};

export const JuryPenalties = ({ results }) => {
  let raceSessions = Object.keys(results.calendar.raceFormat);
  let penalties = [];

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

          penalties.push(penalizedDriver);
        }
      }
    }
  }

  if (!isPenalties(penalties)) {
    return (
      <section className='penalties__jury-penalties'>
        <h2>Statement sędziowski</h2>
        <p className='penalties__general-statement'>
          {results.calendar.races[0].results.statement}
        </p>
        {penalties.map((penalty, index) => {
          return <PenalizedDriver driver={penalty} key={index} />;
        })}
      </section>
    );
  } else {
    return (
      <section className='penalties__jury-penalties'>
        <h2>Statement sędziowski</h2>
        <p className='penalties__general-statement'>
          Brak zgłoszonych incydentów.
        </p>
      </section>
    );
  }
};
