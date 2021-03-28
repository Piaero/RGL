import React from 'react';

import { formatDate } from '../../utilities/formatDate.js';

export const SubcommentItem = ({ subcomment }) => {
  return (
    <div>
      <div className='subcomment-container'>
        <div>
          <img
            className='comment__avatar'
            alt='Avatar'
            src='https://www.w3schools.com/howto/img_avatar.png'
          />
        </div>
        <div className='comment__author-and-input'>
          <p className='comment__author'>{subcomment.author}</p>
          <p className='comment__date'>{formatDate(subcomment.date)}</p>
          <br />
          <p className='comment__input'>{subcomment.content}</p>
        </div>
      </div>
    </div>
  );
};
