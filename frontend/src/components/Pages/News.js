import React from "react";
import { useRouteMatch } from "react-router-dom";

export const News = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> News</h2>
      <h3>News Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
