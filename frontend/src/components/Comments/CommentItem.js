import React from 'react';
import { SubcommentItem } from './SubcommentItem.js';

export const CommentItem = ({ comment }) => {
  return (
    <div>
      <div className='commentItem-container'>
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

      {comment.subcomments?.length
        ? comment.subcomments.map((subcomment, index) => {
            return <SubcommentItem subcomment={subcomment} key={index} />;
          })
        : null}
    </div>
  );
};
