import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export const NewsItem = ({ news }) => {
  let match = useRouteMatch();

  return (
    <section className='news-item'>
      <br />
      Date: {news.date}
      <br />
      Author: {news.author}
      <br />
      Title: {news.title}
      <br />
      Content: {news.content} <br />
      <Link to={`${match.url}/${news._id}`}>Więcej...</Link>
    </section>
  );
};
