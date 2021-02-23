import React from 'react';
import './Menu.css';

export class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuList: ['Newsy', 'Ogłoszenia ligowe', 'Wyścigi', 'Klasyfikacje', 'Kalendarz', 'Regulamin', 'Zapisy', 'Sezony Archiwalne'],
      wyścigi: {
        races: ['Australia', 'Bahrajn', 'Chiny', 'Azerbejdżan'],
        options: ['Wyniki', 'Sędziowska', 'Dyskusje', 'Driver Of The Day', 'Transmisje', 'Powtórki']
      },
      sezony: {
        seasons: ['Sezon 1 F1 2018', 'Sezon 2 F1 2019', 'Sezon 3 F1 2019'],
        options: ['Klasyfikacje', 'Nitki wyścigowe', 'Kalendarz']
      }
    };
  }

  render() {
    return (
      <nav>
        <ul class="dropdown">
          <li><a href="#">Newsy</a></li>
          <li><a href="#">Ogłoszenia ligowe</a></li>
          <li><a href="#">Wyścigi</a>
            <ul>
              {this.state.wyścigi.races.map((race) => {
                return (
                  <li><a href="">{race}</a>
                    <ul>
                      {this.state.wyścigi.options.map((option) => {
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

          <li><a href="#">Klasyfikacje</a>
            <ul>
              <li><a href="">Tabela kierowców</a></li>
              <li><a href="">Tabela konstruktorów</a></li>
              <li><a href="">Punkty Karne</a></li>
            </ul>
          </li>
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
        </ul>
      </nav>
    )
  };
}
