import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello'
import TodoList from './components/TodoList'
import MarvelCharacters from "./components/marvel/characters/MarvelCharacters";
import MarvelCharactersPaginated from './components/marvel/characters/MarvelCharactersPaginated'
import {Provider} from 'react-redux'
import createStore from './store/store'

import {BrowserRouter} from 'react-router-dom';
import MarvelSiteRoot from "./components/marvel/MarvelSiteRoot";

const store = createStore()
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MarvelSiteRoot/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));