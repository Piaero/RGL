import React from "react";

export const NewsItem = ({ news }) => {
  return (
    <section>
      <br />
      Date: {news.date}
      <br />
      Author: {news.author}
      <br />
      Title: {news.title}
      <br />
      Content: {news.content} <br />
      Comments section -----
      <br />
    </section>
  );
};
