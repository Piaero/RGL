import React, { useState } from 'react';
import { SubcommentItem } from './SubcommentItem.js';
import { NewComment } from './NewComment.js';

export const CommentItem = ({ comment, articleID }) => {
  const [visible, setShowResults] = useState(false);
  const showNewComment = () => {
    visible ? setShowResults(false) : setShowResults(true);
  };

  return (
    <div className='comment-and-subcomments'>
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
      <div onClick={showNewComment}>Odpowiedz</div>
      {visible ? (
        <div style={{ margin: '0px 50px' }}>
          <NewComment articleID={articleID} commentID={comment.id} />
        </div>
      ) : null}
      {comment.subcomments?.length
        ? comment.subcomments.map((subcomment, index) => {
            return <SubcommentItem subcomment={subcomment} key={index} />;
          })
        : null}
    </div>
  );
};
