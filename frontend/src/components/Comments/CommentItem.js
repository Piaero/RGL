import React, { useState } from 'react';
import { SubcommentItem } from './SubcommentItem.js';
import { NewComment } from './NewComment.js';

import { formatDate } from '../../wrappers/formatDate.js';

export const CommentItem = ({ comment, article, setArticle }) => {
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
          <p className='comment__date'>{formatDate(comment.date)}</p>
          <br />
          <p className='comment__input'>{comment.content}</p>
        </div>
      </div>
      <div onClick={showNewComment}>Odpowiedz</div>
      {visible ? (
        <div className='new-subcomment'>
          <NewComment
            article={article}
            setArticle={setArticle}
            isSubcomment={true}
            parentCommentId={comment.id}
          />
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
