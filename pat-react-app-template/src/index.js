import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello'
import TodoList from './components/TodoList'
import MarvelCharacters from "./components/marvel/characters/MarvelCharacters";
import MarvelCharactersPaginated from "./components/marvel/characters/MarvelCharactersPaginated";

ReactDOM.render(
  <span>
    <MarvelCharactersPaginated /></span>,
  document.getElementById('root'))