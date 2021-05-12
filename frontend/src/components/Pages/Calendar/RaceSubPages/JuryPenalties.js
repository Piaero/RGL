import React from 'react';
import './RaceSubPages.css';

const penaltiesTextLogic = (penalty) => {
  if (penalty > 0) {
    return (
      <p>
        Kara czasowa:{' '}
        <span
          style={{
            color: penaltiesColour(penalty),
          }}
        >
          {penalty}s
        </span>
      </p>
    );
  } else if (penalty < 0) {
    return (
      <p>
        Anulowanie kary:{' '}
        <span
          style={{
            color: penaltiesColour(penalty),
          }}
        >
          {penalty}s
        </span>
      </p>
    );
  } else {
    return null;
  }
};

const PenalizedDriver = ({ driver }) => {
  return (
    <div className='penalties__driver'>
      <h4>{driver.nick}</h4>
      <p dangerouslySetInnerHTML={{ __html: driver.note }} />
      {penaltiesTextLogic(driver.seconds)}
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

const SessionPenalties = ({ sessionName, penalties }) => {
  penalties.sort((a, b) => a.nick.localeCompare(b.nick));

  if (penalties.length) {
    return (
      <section>
        <h3 className='penalties__session'>{sessionName}</h3>
        {penalties.map((driver, index) => {
          return <PenalizedDriver driver={driver} key={index} />;
        })}
      </section>
    );
  } else {
    return null;
  }
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
  let penalties = {};

  for (const raceSession of raceSessions) {
    let selectedSession =
      results.calendar.races[0].adjustedResults[raceSession];
    penalties[raceSession] = [];

    for (const driver of selectedSession) {
      if (driver.juryPenalties !== null) {
        for (const driverPenalty of driver.juryPenalties) {
          let penalizedDriver = {};

          penalizedDriver.nick = driver.nick;
          penalizedDriver.seconds = driverPenalty.seconds;
          penalizedDriver.points = driverPenalty.points;
          penalizedDriver.note = driverPenalty.note;

          penalties[raceSession].push(penalizedDriver);
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
        {Object.keys(penalties).map((session) => {
          return (
            <SessionPenalties
              sessionName={results.calendar.raceFormat[session].name}
              penalties={penalties[session]}
            />
          );
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
