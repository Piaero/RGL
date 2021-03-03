import React from "react";
import { useRouteMatch } from "react-router-dom";

export const Profile = () => {
  let match = useRouteMatch();

  return (
    <section>
      <h2> Profile</h2>
      <h3>Profile Component</h3>
      Match Url is: {match.url}
      <br />
      Match path is: {match.path}
      <br />
    </section>
  );
};
