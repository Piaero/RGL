import React, { useEffect } from 'react';
import './Login.css';

export const Login = () => {
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
        console.log('Token: ', token);
        console.log('User Id: ', userId);
      }
    });
  }, []);

  return (
    <div className='login-section'>
      <img
        onClick={handleLogin}
        src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/polish/sits_large_border.png'
        alt='Login with Steam'
      />
    </div>
  );
};
