import React from 'react';
import { CommentItem } from './CommentItem.js';

// import "./CommentsSection.css";

export const CommentsSection = ({ comments }) => {
  return (
    <section>
      CommentsSection Component
      <br />
      <br />
      {comments.map((comment, index) => {
        return <CommentItem comment={comment} key={index} />;
      })}
    </section>
  );
};
