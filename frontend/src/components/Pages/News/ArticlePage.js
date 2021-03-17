import React from 'react';
import { useParams } from 'react-router-dom';
import { CommentsSection } from '../../Comments/CommentsSection.js';

export const ArticlePage = () => {
  let { topicId } = useParams();
  const latestRequest = React.useRef(null);

  const [article, setArticle] = React.useState([]);

  React.useEffect(() => {
    latestRequest.current = topicId;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId }),
    };

    fetch('/news/article', requestOptions)
      .then((res) => res.json())
      .then((article) => setArticle(article));
  }, []);

  return (
    <section>
      <br />
      Topic:id {topicId}
      <br />
      test:
      {JSON.stringify(article)}
      Date: {article.date}
      <br />
      Author: {article.author}
      <br />
      Title: {article.title}
      <br />
      Content: {article.content} <br />
      <br />
      <CommentsSection />
    </section>
  );
};
