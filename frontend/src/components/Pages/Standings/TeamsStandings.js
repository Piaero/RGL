import React, { useState, useEffect } from 'react';
import { stylingLogic } from '../../../utilities/stylingLogic';

export const TeamsStandings = ({ teamsStandings }) => {
  return (
    <section className='results'>
      <h2>Klasyfikacja zespołów</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className='team-logo'></th>
            <th className='team-stripe'></th>
            <th>Zespół</th>
            <th className='results__thead__points'>Pkt</th>
          </tr>
        </thead>
        <tbody>
          {teamsStandings.map((team, index) => {
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
                <td>
                  <img
                    src={require(`../../../assets/teamLogo/${team.logoUrl}`)}
                    alt={team.fullName}
                    className='results__team-logo'
                  />
                </td>
                <td>
                  <div
                    className='results__team-stripe'
                    style={{ background: team.colour }}
                  ></div>
                </td>
                <td className='results__team-name'>{team.name}</td>
                <td className='results__points'>{team.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
