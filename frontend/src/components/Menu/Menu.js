import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";




import './Menu.css';

function Topic() {
  let { topicId } = useParams();
  const location = useLocation();


  return (
    <div>  <h3>Requested topic ID: {topicId}</h3>
      <h2>{location.pathname}</h2>
    </div>

  )
}

export const Menu = () => {
  let match = useRouteMatch();


  let archivedSeasons = {
    seasons: ['Sezon 1 F1 2018', 'Sezon 2 F1 2019', 'Sezon 3 F1 2019'],
    options: ['Klasyfikacje', 'Kalendarz']
  }

  console.log(match)


  return (
    <nav>
      <ul class="dropdown">
        <li><Link to={`${match.url}/news`}>Newsy</Link></li>
        <li><Link to={`${match.url}/announcements`}>Ogłoszenia ligowe</Link></li>
        <li><Link to={`${match.url}/races`}>Wyścigi</Link></li>
        <li><Link to={`${match.url}/standings`}>Klasyfikacje</Link></li>
        <li><Link to={`${match.url}/calendar`}>Kalendarz</Link></li>
        <li><Link to={`${match.url}/regulations`}>Regulamin</Link></li>
        <li><Link to={`${match.url}/join`}>Zapisy</Link></li>
        <li><Link to={`${match.url}/archived-seasons`}>Sezony archiwalne</Link>
          <ul>
            {archivedSeasons.seasons.map((season) => {
              return (
                <li><a href="">{season}</a>
                  <ul>
                    {archivedSeasons.options.map((option) => {
                      return (
                        <li><a href="">{option}</a></li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </li>
        <li><Link to={`${match.url}/profile`}>Mój profil</Link></li>
      </ul>

      Match Url{match.url}<br></br>
      Match path {match.path}<br></br>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </nav>
  )
};

