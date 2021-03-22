import React from 'react';
import { CommentItem } from './CommentItem.js';

// import "./CommentsSection.css";

export const CommentsSection = ({ comments, articleID }) => {
  return (
    <section>
      <br />
      {comments
        ? comments.map((comment, index) => {
            return (
              <CommentItem
                articleID={articleID}
                comment={comment}
                key={index}
              />
            );
          })
        : null}
    </section>
  );
};
