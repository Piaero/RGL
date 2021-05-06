import React, { useState } from 'react';
import { SubcommentItem } from './SubcommentItem.js';
import { NewComment } from './NewComment.js';

import { formatDate } from '../../utilities/formatDate.js';

export const CommentItem = ({ comment, article, getArticle, setArticle }) => {
  const [visible, toggleVisible] = useState(false);
  const showNewComment = () => {
    visible ? toggleVisible(false) : toggleVisible(true);
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
          <p className='comment__date'>{formatDate.dateHour(comment.date)}</p>
          <br />
          <p className='comment__input'>{comment.content}</p>
        </div>
      </div>
      <div onClick={showNewComment}>Odpowiedz</div>
      {visible ? (
        <div className='new-subcomment'>
          <NewComment
            article={article}
            getArticle={getArticle}
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
