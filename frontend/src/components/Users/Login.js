import React, { useEffect, useState } from 'react';
import { UsersAPI } from './UsersAPI';
import './Login.css';

export const Login = () => {
  const [isLoggedIn, setLoggedId] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const handleLogin = () => {
    const popupWindow = window.open(
      //   process.env.BASE_URL + '/auth/steam',
      'http://localhost:5000/auth/steam',
      '_blank',
      'width=800, height=600'
    );
    if (window.focus) popupWindow.focus();
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      //   if (event.origin !== process.env.REACT_APP_API_URL) return;

      const { token, ok, userId } = event.data;
      if (ok) {
        localStorage.setItem('jwtToken', token);
        UsersAPI.getUser(userId).then((user) => {
          setLoggedUser(user);
          setLoggedId(true);
        });
      } else {
        setLoggedId(false);
      }
    });
  }, []);

  return (
    <div className='login-section'>
      {isLoggedIn ? (
        <div className='user-container'>
          <img src={loggedUser.avatarUrl} />
          <p>{loggedUser.nickname}</p>
        </div>
      ) : (
        <img
          onClick={handleLogin}
          src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/polish/sits_large_border.png'
          alt='Login with Steam'
        />
      )}
    </div>
  );
};
