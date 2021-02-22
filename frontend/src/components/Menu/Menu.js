import React from 'react';
import './Menu.css';

export class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuList: ['Newsy', ' Ogłoszenia ligowe', 'Wyścigi', 'Klasyfikacje', 'Kalendarz', 'Regulamin', 'Zapisy', 'Sezony Archiwalne']
    };

  }

  render() {
    return (
      <nav>
        <ul>

          {this.state.menuList.map((item) => {
            return (
              <li>
                <a href="#">
                  {item}
                </a>
              </li>
            )
          })}

        </ul>

      </nav>
    )
  };
}
