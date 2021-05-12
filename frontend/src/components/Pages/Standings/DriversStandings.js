import React, { useState, useEffect } from 'react';
import { stylingLogic } from '../../../utilities/stylingLogic';

export const DriversStandings = ({ driversStandings }) => {
  return (
    <section className='results'>
      <h2>Klasyfikacja kierowców</h2>
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
            <th className='results__thead__points'>Pkt</th>
          </tr>
        </thead>

        <tbody>
          {driversStandings.map((driver, index) => {
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
                    src={require(`../../../assets/teamLogo/${driver.teamLogo}`)}
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
                <td className='results__points'>{driver.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
