import React from "react";
import { Link } from "react-router-dom";
import "./Divisions.css";

export class Divisions extends React.Component {
  state = {
    divisions: this.props.divisions,
    selectedDivision: null,
  };

  setCurrentDivision(newDivision) {
    this.setState({
      selectedDivision: newDivision,
    });
  }

  render() {
    if (!this.state.divisions.length) {
      return <section className="divisions-container">Ładowanie...</section>;
    } else {
      return (
        <section className="divisions-container">
          <h1 className="title">Dywizje: </h1>

          {this.state.divisions.map((division, index) => {
            return (
              <Link to={division.path} key={index}>
                <div
                  className="division"
                  onClick={() => this.setCurrentDivision(division)}
                >
                  <img
                    src={require(`../../assets/logo/${division.gameLogo}`)}
                    alt={division.division}
                    className="division-logo"
                  />
                  <div>{division.division}</div>
                </div>
              </Link>
            );
          })}
        </section>
      );
    }
  }
}
