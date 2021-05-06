import React from 'react';
import { CommentItem } from './CommentItem.js';

export const CommentsSection = ({
  comments,
  article,
  getArticle,
  setArticle,
}) => {
  return (
    <section>
      <br />
      {comments
        ? comments.map((comment, index) => {
            return (
              <CommentItem
                article={article}
                getArticle={getArticle}
                setArticle={setArticle}
                comment={comment}
                key={index}
              />
            );
          })
        : null}
    </section>
  );
};
