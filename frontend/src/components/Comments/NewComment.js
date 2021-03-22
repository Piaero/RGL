import React, { useEffect, useRef } from 'react';

import { CommentsAPI } from './CommentsAPI.js';

import './Comments.css';

export const NewComment = ({ articleID, commentID }) => {
  const formRef = useRef(null);
  const isAutoFocus = commentID ? true : false;

  useEffect(() => {
    const listener = (event) => {
      if (
        event.keyCode === 13 &&
        !event.shiftKey &&
        !event.ctrlKey &&
        formRef.current === document.activeElement
      ) {
        CommentsAPI.submitComment(formRef, articleID, commentID);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className='new-comment-container newComment-invisible'>
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
            autoFocus={isAutoFocus}
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
