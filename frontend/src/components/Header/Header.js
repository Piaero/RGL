import React from 'react';
import './Header.css';

import logo from '../../assets/logo/rgl_logo.png'

import facebook from '../../assets/logo/discord.png'
import discord from '../../assets/logo/facebook.png'
import youtube from '../../assets/logo/youtube.png'

export class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <img src={logo} alt="logo" className="logo" />

        <div className="title-and-socials">
          <h1 className="title">Liga esportowa RGL</h1>
          <div className="socials-container">
            <img src={facebook} alt="facebook" className="social" />
            <img src={discord} alt="discord" className="social" />
            <img src={youtube} alt="youtube" className="social" />
          </div>
          <h2 className="title">Dywizja [[nazwa dywizji]] </h2>
        </div>

      </header>
    )
  };
}
