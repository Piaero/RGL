import React, { useState, useEffect } from 'react';

export const PenaltiesStandings = ({ penaltiesStandings }) => {
  return (
    <section className='results'>
      <h2>Punkty karne</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nr</th>
            <th>Kierowca</th>
            <th>Pseudonim</th>
            <th className='results__thead__points'>Pkt</th>
          </tr>
        </thead>
        <tbody>
          {penaltiesStandings.map((driver, index) => {
            if (!driver.penalties) {
              return null;
            } else {
              return (
                <tr key={index}>
                  <td className='results__position'>{index + 1}</td>
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
                  <td className='results__points'>{driver.penalties}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </section>
  );
};
