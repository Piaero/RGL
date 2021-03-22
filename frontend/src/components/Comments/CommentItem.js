import React, { useState } from 'react';
import { SubcommentItem } from './SubcommentItem.js';
import { NewComment } from './NewComment.js';

export const CommentItem = ({ comment, articleID }) => {
  const [visible, setShowResults] = useState(false);
  const showNewComment = () => setShowResults(true);

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
      <div onClick={showNewComment}>Odpowiedz</div>
      articleID: {articleID} <br />
      Comment.id: {comment.id}
      {visible ? (
        <NewComment articleID={articleID} commentID={comment.id} />
      ) : null}
      {comment.subcomments?.length
        ? comment.subcomments.map((subcomment, index) => {
            return <SubcommentItem subcomment={subcomment} key={index} />;
          })
        : null}
    </div>
  );
};
