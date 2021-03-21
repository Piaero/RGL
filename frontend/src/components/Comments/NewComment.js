import React, { useState, useEffect, useRef } from 'react';

import './Comments.css';

export const NewComment = ({ articleID }) => {
  const formRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        console.log(`only enter`);
        alert(formRef.current.value);
        submitComment();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const submitComment = () => {
    let commentToSubmit = {
      author: 'ID? autor',
      content: formRef.current.value,
      articleID: articleID,
      responseToCommentID: 0,
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentToSubmit }),
    };

    fetch('/submit-comment', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ suggestions: data });
      });
  };

  return (
    <div className='new-comment-container'>
      <div>
        <img
          className='comment__avatar'
          alt='Avatar'
          src='https://www.w3schools.com/howto/img_avatar.png'
        />
      </div>
      <div className='comment__author-and-input'>
        <p className='comment__author'>SteamNickname, alias</p>
        <br />

        <div className='textarea-wrapper'>
          <textarea
            ref={formRef}
            className='comment__input'
            name='new-comment'
            rows='4'
          />
        </div>
      </div>
    </div>
  );
};
