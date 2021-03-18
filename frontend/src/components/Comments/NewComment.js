import React from 'react';

import './NewComment.css';

export const NewComment = () => {
  return (
    <div className='new-comment-container'>
      <div>
        <img
          className='comment__avatar'
          alt='Avatar'
          src='https://www.w3schools.com/howto/img_avatar.png'
        />
      </div>
      <div className='comment_author-and-input'>
        <p className='comment__author'>SteamNickname, alias</p>
        <p className='comment__date'>Date: </p>
        <textarea
          className='comment__input'
          name='new-comment'
          rows='4'
          cols='50'
        />
      </div>
    </div>
  );
};
