import React from 'react';
import { CommentItem } from './CommentItem.js';

// import "./CommentsSection.css";

export const CommentsSection = ({ comments, article, setArticle }) => {
  return (
    <section>
      <br />
      {comments
        ? comments.map((comment, index) => {
            return (
              <CommentItem
                comment={comment}
                article={article}
                setArticle={setArticle}
                key={index}
              />
            );
          })
        : null}
    </section>
  );
};
