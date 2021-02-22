import React from 'react';
import './Header.css';

import logo from '../../assets/logo/rgl_logo.png'

import facebook from '../../assets/logo/facebook.png'
import facebookGroup from '../../assets/logo/facebook-group.png'
import discord from '../../assets/logo/discord.png'
import youtube from '../../assets/logo/youtube.png'

export class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <img src={logo} alt="logo" className="logo" />

        <div className="title-and-socials">
          <h1 className="title">Liga esportowa RGL</h1>
          <div className="socials-container">
            <a href="https://www.facebook.com/rglleague" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className="social" />
            </a>
            <a href="https://www.facebook.com/groups/205233076968543" target="_blank" rel="noopener noreferrer">
              <img src={facebookGroup} alt="Grupa na Facebooku" className="social" />
            </a>
            <a href="https://discord.gg/dr36uD4jzH" target="_blank" rel="noopener noreferrer">
              <img src={discord} alt="Discord" className="social" />
            </a>
            <a href="https://www.youtube.com/channel/UC5RdyICRUE4omcvK5myEmdg?fbclid=IwAR3faeHCM_EOmic_VlBoFbpBtc7wfIHVKC_bpgIhry-daaHuz2igvRVNbG8" target="_blank" rel="noopener noreferrer">
              <img src={youtube} alt="Youtube" className="social" />
            </a>
          </div>
          <h2 className="title">Dywizja [[nazwa dywizji]] </h2>
        </div>
      </header>
    )
  };
}
