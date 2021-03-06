import React from "react";
import { useRouteMatch } from "react-router-dom";
import NotFound from "../../assets/image/NotFound.jpg";

export const NotFound = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Not Found</h2>
      <h3>Not FoundComponent</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
      <img src={NotFound} alt="404: Page not found" className="not-found" />
    </section>
  );
};
