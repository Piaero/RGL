import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { CommentsSection } from '../../Comments/CommentsSection.js';
import { NewComment } from '../../Comments/NewComment.js';
import { formatDate } from '../../../utilities/formatDate.js';

export const ArticlePage = () => {
  let { topicId } = useParams();
  const latestRequest = useRef(null);

  const [article, setArticle] = useState([]);

  const getArticle = () => {
    latestRequest.current = topicId;

    return fetch(`/news/article?id=${topicId}`).then((response) =>
      response.json()
    );
  };

  useEffect(() => {
    getArticle().then((article) => setArticle(article));
  }, []);

  if (article.length === 0) {
    return <section>Ładowanie artykułu...</section>;
  } else {
    return (
      <section className='comments-section'>
        <br />
        Topic:id {topicId}
        <br />
        Article ID from DB: {article._id}
        <br />
        Date: {formatDate.dateHour(article.date)}
        <br />
        Author: {article.author}
        <br />
        Title: {article.title}
        <br />
        Content: {article.content} <br />
        <br />
        <br />
        <NewComment
          article={article}
          getArticle={getArticle}
          setArticle={setArticle}
          isSubcomment={false}
          parentCommentId={null}
        />
        <CommentsSection
          article={article}
          getArticle={getArticle}
          setArticle={setArticle}
          comments={article.comments}
        />
      </section>
    );
  }
};
