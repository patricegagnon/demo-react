import React from 'react'

import {NavLink, Route, Switch} from 'react-router-dom'
import MarvelCharacters from './characters/MarvelCharacters'
import MarvelCharactersNoPagination from './characters/MarvelCharactersNoPaginationNoRedux'
import MarvelCharactersPaginatedNoRedux from './characters/MarvelCharactersPaginatedNoRedux'
import MarvelCharacterDetail from './characters/MarvelCharacterDetail'
import MarvelCharacterDetailNoRedux from './characters/MarvelCharacterDetailNoRedux'
import MarvelComics from './comics/MarvelComics'
import MarvelComicDetail from './comics/MarvelComicDetail'

const MarvelSection = ({match}) => {
  return <div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/characters`}>Personnages</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to={`${match.url}/comics`}>Bande dessinées</NavLink>
      </li>
    </ul>
    <Switch>
      <Route exact path={[`${match.url}/characters`, `${match.url}`]} component={MarvelCharacters}/>
      <Route exact path={[`${match.url}/characters/:id`]} component={MarvelCharacterDetail}/>
      <Route exact path={[`${match.url}/comics`, `${match.url}`]} component={MarvelComics}/>
      <Route exact path={[`${match.url}/comics/:id`, `${match.url}`]} component={MarvelComicDetail}/>
    </Switch>
  </div>
}

export default MarvelSection
