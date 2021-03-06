import React from "react";
import "./NextRace.css";

import youtubeLogo from "../../assets/logo/youtube.png";
import f12020Logo from "../../assets/logo/f1-2020.png";

export class NextRace extends React.Component {
  render() {
    return (
      <section className="nextrace-container">
        <h1 className="title">Następny wyścig: </h1>
        <div className="nextrace">
          <div className="nextrace-division">
            <img
              src={f12020Logo}
              alt="F1 2020"
              className="nextrace-division-logo"
            />
            <div>Formuła 1</div>
          </div>
          <p>GP [[ nazwa miejsca]]</p>
          <p>22.02.2022, godz 21:00</p>
        </div>
        <a
          href="https://www.youtube.com/channel/UC5RdyICRUE4omcvK5myEmdg?fbclid=IwAR3faeHCM_EOmic_VlBoFbpBtc7wfIHVKC_bpgIhry-daaHuz2igvRVNbG8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtubeLogo} alt="Youtube" className="nextrace-social" />
        </a>
      </section>
    );
  }
}
