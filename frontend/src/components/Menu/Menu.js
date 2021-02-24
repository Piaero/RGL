import React from 'react';
import './Menu.css';

export class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      sezony: {
        seasons: ['Sezon 1 F1 2018', 'Sezon 2 F1 2019', 'Sezon 3 F1 2019'],
        options: ['Klasyfikacje', 'Kalendarz']
      }
    };
  }

  render() {
    return (
      <nav>
        <ul class="dropdown">
          <li><a href="#">Newsy</a></li>
          <li><a href="#">Ogłoszenia ligowe</a></li>
          <li><a href="#">Wyścigi</a></li>
          <li><a href="#">Klasyfikacje</a></li>
          <li><a href="#">Kalendarz</a></li>
          <li><a href="#">Regulamin</a></li>
          <li><a href="#">Zapisy</a></li>
          <li><a href="#">Sezony archiwalne</a>
            <ul>
              {this.state.sezony.seasons.map((season) => {
                return (
                  <li><a href="">{season}</a>
                    <ul>
                      {this.state.sezony.options.map((option) => {
                        return (
                          <li><a href="">{option}</a></li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </li>
          <li><a href="#">Mój profil</a></li>
        </ul>
      </nav>
    )
  };
}
