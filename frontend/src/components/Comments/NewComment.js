import React, { useEffect, useRef } from 'react';

import { CommentsAPI } from './CommentsAPI.js';

import './Comments.css';

export const NewComment = ({ commentID, article, setArticle }) => {
  const formRef = useRef(null);
  var isAutoFocus = commentID ? true : false;

  const updateCommentState = (commentData) => {
    if (commentID === false) {
      var articleWithNewComment = { ...article };
      articleWithNewComment.comments.push(commentData.comment);
    } else {
      var articleWithNewComment = { ...article };
      articleWithNewComment.comments[commentID - 1].subcomments.push(
        commentData.comment
      );
    }

    formRef.current.blur();
    formRef.current.value = '';
    setArticle(articleWithNewComment);
  };

  useEffect(() => {
    let id =
      commentID === false
        ? article.comments.length + 1
        : article.comments[commentID - 1].subcomments.length;

    let commentData = {
      comment: {
        id: id,
        date: new Date().toString(),
        author: 'ID? autor',
        content: formRef.current.value,
        likes: [],
        subcomments: [],
      },
      parameters: {
        articleID: article._id,
        responseToCommentID: commentID,
      },
    };

    const listener = (event) => {
      if (
        event.keyCode === 13 &&
        !event.shiftKey &&
        !event.ctrlKey &&
        formRef.current === document.activeElement
      ) {
        commentData.comment.content = formRef.current.value;
        CommentsAPI.submitComment(commentData);
        updateCommentState(commentData);
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
