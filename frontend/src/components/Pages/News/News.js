import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { NewsItem } from './NewsItem.js';

export const News = () => {
  let match = useRouteMatch();

  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    fetch('/news')
      .then((res) => res.json())
      .then((news) => setNews(news));
  }, []);

  if (!news.length) {
    return <section>Ładowanie newsów...</section>;
  } else {
    return (
      <section>
        <h2>News</h2>
        <h3>News Component</h3>
        Match Url is: {match.url}
        <br />
        Match path is: {match.path}
        <br />
        NEWS: ------------------- <br />
        {news.map((news, index) => {
          return <NewsItem news={news} key={index} />;
        })}
      </section>
    );
  }
};
