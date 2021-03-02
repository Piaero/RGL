import React from 'react';
import './Division.css';

import f12020 from '../../assets/logo/f1-2020.png'
import acc from '../../assets/logo/acc.png'

export class Division extends React.Component {
  state = {
    divisions: {
      "F1-2020": {
        fullName: "Formuła 1",
        imageURL: f12020,
      },
      "F2-2020": {
        fullName: "Formuła 2",
        imageURL: f12020,
      },
      "GT3-ACC": {
        fullName: "GT3 Asetto Corsa",
        imageURL: acc,
      }
    },
    selectedDivision: null,
  };

  setSelectedDivision(newDivision) {
    this.setState({
      selectedDivision: newDivision,
    });
    console.log(this.state.selectedDivision)
  }

  render() {
    return (
      <section className="divisions-container">
        <h1 className="title">Dywizje: </h1>

        {Object.keys(this.state.divisions).map((division, index) => {
          return (
            <div className="division" key={index} onClick={() => this.setSelectedDivision(division)}>
              <img src={this.state.divisions[division].imageURL} alt={division} className="division-logo" />
              <div>{division}</div>
            </div>
          )
        })}

      </section>
    )
  };
}
