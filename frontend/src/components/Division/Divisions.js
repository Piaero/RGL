import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

import "./Divisions.css";

import f12020 from "../../assets/logo/f1-2020.png";
import acc from "../../assets/logo/acc.png";

export class Divisions extends React.Component {
  state = {
    divisions: [
      {
        path: "/F2-2020",
        fullName: "Formuła 1",
        imageURL: f12020,
      },
      {
        path: "/F2-2020",
        fullName: "Formuła 2",
        imageURL: f12020,
      },
      {
        path: "/GT3-ACC",
        fullName: "GT3 Asetto Corsa",
        imageURL: acc,
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
                <div> {division.path.slice(1)}</div>
              </div>
            </Link>
          );
        })}
      </section>
    );
  }
}
