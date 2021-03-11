import React from "react";
import { Link } from "react-router-dom";
import "./Divisions.css";
import f12020Logo from "../../assets/logo/f1-2020.png";
import accLogo from "../../assets/logo/acc.png";

export class Divisions extends React.Component {
  state = {
    divisions: [
      {
        path: "/F1",
        fullName: "F1",
        imageURL: f12020Logo,
      },
      {
        path: "/F2",
        fullName: "F2",
        imageURL: f12020Logo,
      },
      {
        path: "/GT3-ACC",
        fullName: "GT3 ACC",
        imageURL: accLogo,
      },
    ],
    selectedDivision: null,
  };

  setDivision(newDivision) {
    this.setState({
      selectedDivision: newDivision,
    });
  }

  render() {
    return (
      <section className="divisions-container">
        <h1 className="title">Dywizje: </h1>

        {this.state.divisions.map((division, index) => {
          return (
            <Link to={division.path} key={index}>
              <div
                className="division"
                onClick={() => this.setDivision(division)}
              >
                <img
                  src={division.imageURL}
                  alt={division.fullName}
                  className="division-logo"
                />
                <div>{division.fullName}</div>
              </div>
            </Link>
          );
        })}
      </section>
    );
  }
}
