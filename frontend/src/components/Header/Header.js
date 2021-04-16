import React from 'react';
import { Login } from '../Login/Login.js';
import './Header.css';
import RGLLogo from '../../assets/logo/rgl_logo.png';
import facebookLogo from '../../assets/logo/facebook.png';
import facebookGroupLogo from '../../assets/logo/facebook-group.png';
import youtubeLogo from '../../assets/logo/youtube.png';
import discordLogo from '../../assets/logo/discord.png';

export class Header extends React.Component {
  render() {
    return (
      <header className='header-container'>
        <img src={RGLLogo} alt='logo' className='logo' />

        <div className='title-and-socials'>
          <h1 className='title'>Liga esportowa RGL</h1>
          <div className='socials-container'>
            <a
              href='https://www.facebook.com/rglleague'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={facebookLogo} alt='Facebook' className='social' />
            </a>
            <a
              href='https://www.facebook.com/groups/205233076968543'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={facebookGroupLogo}
                alt='Grupa na Facebooku'
                className='social'
              />
            </a>
            <a
              href='https://discord.gg/dr36uD4jzH'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={discordLogo} alt='Discord' className='social' />
            </a>
            <a
              href='https://www.youtube.com/channel/UC5RdyICRUE4omcvK5myEmdg?fbclid=IwAR3faeHCM_EOmic_VlBoFbpBtc7wfIHVKC_bpgIhry-daaHuz2igvRVNbG8'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={youtubeLogo} alt='Youtube' className='social' />
            </a>
          </div>
          <h2 className='title'>Dywizja [[nazwa dywizji]] </h2>
        </div>
        <Login />
      </header>
    );
  }
}
