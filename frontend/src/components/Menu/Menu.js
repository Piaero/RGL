import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

import { News } from "../Pages/News";
import { Announcements } from "../Pages/Announcements";
import { Races } from "../Pages/Races";
import { Standings } from "../Pages/Standings";
import { Calendar } from "../Pages/Calendar";
import { Regulations } from "../Pages/Regulations";
import { Join } from "../Pages/Join";
import { ArchivedSeasons } from "../Pages/ArchivedSeasons";
import { Profile } from "../Pages/Profile";

import "./Menu.css";

export const Menu = () => {
  let match = useRouteMatch();

  let archivedSeasons = {
    seasons: ["Sezon 1 F1 2018", "Sezon 2 F1 2019", "Sezon 3 F1 2019"],
    options: ["Klasyfikacje", "Kalendarz"],
  };

  return (
    <section>
      <nav>
        <ul class="dropdown">
          <li>
            <Link to={`${match.url}/news`}>Newsy</Link>
          </li>
          <li>
            <Link to={`${match.url}/announcements`}>Ogłoszenia ligowe</Link>
          </li>
          <li>
            <Link to={`${match.url}/races`}>Wyścigi</Link>
          </li>
          <li>
            <Link to={`${match.url}/standings`}>Klasyfikacje</Link>
          </li>
          <li>
            <Link to={`${match.url}/calendar`}>Kalendarz</Link>
          </li>
          <li>
            <Link to={`${match.url}/regulations`}>Regulamin</Link>
          </li>
          <li>
            <Link to={`${match.url}/join`}>Zapisy</Link>
          </li>
          <li>
            <Link to={`${match.url}/archived-seasons`}>Sezony archiwalne</Link>
            <ul>
              {archivedSeasons.seasons.map((season) => {
                return (
                  <li>
                    <a href="">{season}</a>
                    <ul>
                      {archivedSeasons.options.map((option) => {
                        return (
                          <li>
                            <a href="">{option}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <Link to={`${match.url}/profile`}>Mój profil</Link>
          </li>
        </ul>
      </nav>

      <content>
        <Switch>
          <Route path={`${match.path}/news`}>
            <News />
          </Route>
          <Route path={`${match.path}/announcements`}>
            <Announcements />
          </Route>
          <Route path={`${match.path}/races`}>
            <Races />
          </Route>
          <Route path={`${match.path}/standings`}>
            <Standings />
          </Route>
          <Route path={`${match.path}/calendar`}>
            <Calendar />
          </Route>
          <Route path={`${match.path}/regulations`}>
            <Regulations />
          </Route>
          <Route path={`${match.path}/join`}>
            <Join />
          </Route>
          <Route path={`${match.path}/archived-seasons`}>
            <ArchivedSeasons />
          </Route>
          <Route path={`${match.path}/profile`}>
            <Profile />
          </Route>
          <Route path={match.path}>
            <News />
          </Route>
        </Switch>
      </content>
    </section>
  );
};
