import React from 'react';

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { News } from '../Pages/News/News';
import { Announcements } from '../Pages/Announcements/Announcements';
import { Races } from '../Pages/Races/Races';
import { Standings } from '../Pages/Standings/Standings';
import { Calendar } from '../Pages/Calendar/Calendar';
import { Regulations } from '../Pages/Regulations/Regulations';
import { Join } from '../Pages/Join/Join';
import { ArchivedSeasons } from '../Pages/ArchivedSeasons/ArchivedSeasons';
import { Profile } from '../Pages/Profile/Profile';
import { NotFound } from '../Pages/NotFound/NotFound';

import { ArticlePage } from '../Pages/News/ArticlePage.js';
import { ResultsPage } from '../Pages/Calendar/RaceSubPages/ResultsPage.js';
import { Reports } from '../Pages/Calendar/RaceSubPages/Reports.js';
import { Discussion } from '../Pages/Calendar/RaceSubPages/Discussion.js';
import { Dotd } from '../Pages/Calendar/RaceSubPages/Dotd.js';
import { Transmissions } from '../Pages/Calendar/RaceSubPages/Transmissions.js';
import { Replays } from '../Pages/Calendar/RaceSubPages/Replays.js';

import './MenuWithPagesRouter.css';

export const MenuWithPagesRouter = () => {
  let match = useRouteMatch();

  let archivedSeasons = {
    seasons: ['Sezon 1 F1 2018', 'Sezon 2 F1 2019', 'Sezon 3 F1 2019'],
    options: ['Klasyfikacje', 'Kalendarz'],
  };

  return (
    <section>
      <nav className='menu'>
        <ul className='dropdown'>
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
              {archivedSeasons.seasons.map((season, index) => {
                return (
                  <li key={index}>
                    <a href='#'>{season}</a>
                    <ul>
                      {archivedSeasons.options.map((option, index) => {
                        return (
                          <li key={index}>
                            <a href='#'>{option}</a>
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

      <section className='page-content'>
        <Switch>
          <Route exact path={`${match.path}/news`}>
            <News />
          </Route>
          <Route path={`${match.path}/news/:topicId`}>
            <ArticlePage />
          </Route>
          <Route exact path={`${match.path}/announcements`}>
            <Announcements />
          </Route>
          <Route exact path={`${match.path}/races`}>
            <Races />
          </Route>
          <Route exact path={`${match.path}/standings`}>
            <Standings />
          </Route>
          <Route exact path={`${match.path}/calendar`}>
            <Calendar />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/results`}>
            <ResultsPage />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/reports`}>
            <Reports />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/discussion`}>
            <Discussion />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/dotd`}>
            <Dotd />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/transmissions`}>
            <Transmissions />
          </Route>
          <Route path={`${match.path}/calendar/:raceId/replays`}>
            <Replays />
          </Route>
          <Route exact path={`${match.path}/regulations`}>
            <Regulations />
          </Route>
          <Route exact path={`${match.path}/join`}>
            <Join />
          </Route>
          <Route exact path={`${match.path}/archived-seasons`}>
            <ArchivedSeasons />
          </Route>
          <Route exact path={`${match.path}/profile`}>
            <Profile />
          </Route>
          <Route exact path={match.path}>
            <News />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </section>
    </section>
  );
};
