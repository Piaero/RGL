import React from 'react';
import { CommentItem } from './CommentItem.js';

export const CommentsSection = ({ comments, article, setArticle }) => {
  return (
    <section>
      <br />
      {comments
        ? comments.map((comment, index) => {
            return (
              <CommentItem
                article={article}
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
