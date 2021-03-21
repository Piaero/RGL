import React from 'react';
import { NewComment } from './NewComment.js';

export const CommentItem = ({ comment }) => {
  return (
    <div>
      <div className='new-comment-container'>
        <div>
          <img
            className='comment__avatar'
            alt='Avatar'
            src='https://www.w3schools.com/howto/img_avatar.png'
          />
        </div>
        <div className='comment__author-and-input'>
          <p className='comment__author'>{comment.author}</p>
          <p className='comment__date'>{comment.date}</p>
          <br />
          <p className='comment__input'>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};
