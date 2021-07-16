var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const formatResults = require('../utilities/formatResults.js');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  const db = client.db('RGL');
  const countersCollection = db.collection('divisions');
});

router.get('/standings', (req, res) => {
  const whichDriverHasBetterPositions = (driver1, driver2) => {
    let maxPosition = 50;
    for (let i = 1; i <= maxPosition; i++) {
      if (
        (driver1.allPositionsCount[i] !== undefined &&
          driver2.allPositionsCount[i] === undefined) ||
        driver1.allPositionsCount[i]?.length >
          driver2.allPositionsCount[i]?.length
      ) {
        return -1;
      }
      if (
        (driver1.allPositionsCount[i] === undefined &&
          driver2.allPositionsCount[i] !== undefined) ||
        driver1.allPositionsCount[i]?.length <
          driver2.allPositionsCount[i]?.length
      ) {
        return 1;
      } else if (i === maxPosition) {
        console.log(
          `whichDriverHasBetterPositions function has NOT determined a better driver!`
        );
      }
    }
  };

  const setRacesPoints = (races, raceFormat) => {
    let adjustedRaces = [];

    for (let race of races) {
      if (race.results !== null) {
        race = formatResults.formatResults(race, raceFormat);
        adjustedRaces.push(race);
      }
    }
    return adjustedRaces;
  };

  const calculateDriversPoints = (driversList, races, teams) => {
    for (const driver of driversList) {
      driver.points = 0;
      driver.appearances = 0;
      driver.allPositionsCount = {};
    }

    for (const race of races) {
      let raceNumber = races.indexOf(race) + 1;
      for (const raceSession in race.adjustedResults) {
        for (const driver of race.adjustedResults[raceSession]) {
          let selectedDriver = driversList.find(
            (dr) => dr.nick === driver.nick
          );

          selectedDriver.points += driver.points;

          if (raceSession === 'race') {
            selectedDriver.appearances += 1;

            let positionInSession =
              race.adjustedResults[raceSession].indexOf(driver) + 1;

            selectedDriver.allPositionsCount[positionInSession] === undefined
              ? (selectedDriver.allPositionsCount[positionInSession] = [
                  raceNumber,
                ])
              : selectedDriver.allPositionsCount[positionInSession].push(
                  raceNumber
                );
          }
        }
      }
    }

    driversList = setTeamDetailsForDivers(driversList, teams);

    let copiedDrivers = JSON.parse(JSON.stringify(driversList));

    return copiedDrivers.sort((a, b) => {
      return (
        (a.bestPosition === null) - (b.bestPosition === null) ||
        b.points - a.points ||
        whichDriverHasBetterPositions(a, b)
      );
    });
  };

  const calculateDriversPenalties = (drivers, races, teams) => {
    const driverTotalPenalties = (driver) => {
      if (driver.juryPenalties) {
        return driver.juryPenalties.reduce(
          (previousValue, currentValue) => previousValue + currentValue.points,
          0
        );
      } else {
        return 0;
      }
    };

    for (const driver of drivers) {
      driver.penalties = 0;
    }

    for (const race of races) {
      for (const raceSession in race.adjustedResults) {
        for (const driver of race.adjustedResults[raceSession]) {
          drivers.find((dr) => dr.nick === driver.nick).penalties +=
            driverTotalPenalties(driver);
        }
      }
    }

    drivers = setTeamDetailsForDivers(drivers, teams);

    return drivers.sort((a, b) => {
      return b.penalties - a.penalties;
    });
  };

  const setTeamDetailsForDivers = (drivers, teams) => {
    for (const driver of drivers) {
      let selectedTeam = teams.find((team) => team.name === driver.team);

      driver.teamFullName = selectedTeam.fullName;
      driver.teamLogo = selectedTeam.logoUrl;
      driver.teamColour = selectedTeam.colour;
    }

    return drivers;
  };

  const calculateTeamsPoints = (races, drivers, teams) => {
    for (const team of teams) {
      team.points = 0;
    }

    for (const race of races) {
      for (const raceSession in race.adjustedResults) {
        for (var driver of race.adjustedResults[raceSession]) {
          let driversTeam = drivers.find((dr) => dr.nick === driver.nick).team;
          teams.find((team) => team.name === driversTeam).points +=
            driver.points;
        }
      }
    }
    return teams.sort((a, b) => {
      return b.points - a.points;
    });
  };

  client
    .db('RGL')
    .collection('divisions')
    .find({ division: req.query.division })
    .project({
      calendar: 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      let races = results[0].calendar.races;
      const raceFormat = results[0].calendar.raceFormat;
      let drivers = results[0].calendar.drivers;
      let teams = results[0].calendar.teams;

      const adjustedRaces = setRacesPoints(races, raceFormat);

      const standings = {};
      standings.drivers = calculateDriversPoints(drivers, adjustedRaces, teams);
      standings.teams = calculateTeamsPoints(adjustedRaces, drivers, teams);
      standings.penalties = calculateDriversPenalties(
        drivers,
        adjustedRaces,
        teams
      );
      standings.seasonName =
        results[0].division + ' ' + results[0].calendar.seasonName;

      res.json(standings);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
