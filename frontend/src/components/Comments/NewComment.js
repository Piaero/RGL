import React, { useEffect, useRef } from 'react';

import './Comments.css';

export const NewComment = ({ articleID, commentID }) => {
  const formRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (
        event.keyCode === 13 &&
        !event.shiftKey &&
        !event.ctrlKey &&
        formRef.current === document.activeElement
      ) {
        console.log(formRef);
        alert(formRef.current.value);
        submitComment();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const submitComment = () => {
    let commentToSubmit = {
      author: 'ID? autor',
      content: formRef.current.value,
      articleID: articleID,
      responseToCommentID: commentID,
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentToSubmit }),
    };

    fetch('/submit-comment', requestOptions).then((response) =>
      response.json()
    );
  };

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
