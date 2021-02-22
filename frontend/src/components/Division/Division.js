import React from 'react';
import './Division.css';

import f12020 from '../../assets/logo/f1-2020.png'

export class Division extends React.Component {
  render() {
    return (
      <section className="divisions-container">
        <h1 className="title">Inne dywizje: </h1>
        <a href="#">
          <div className="division">
            <img src={f12020} alt="F1 2020" className="division-logo" />
            <div>Formuła 1</div>
          </div>
        </a>

        <a href="#">
          <div className="division">
            <img src={f12020} alt="F1 2020" className="division-logo" />
            <div>Formuła 2</div>
          </div>
        </a>

      </section>
    )
  };
}
