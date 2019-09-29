import MarvelService from "../../services/MarvelProxyService";

export const Actions = {
  SET_FETCHING: 'SET_FETCHING',
  SET_CHARACTERS: 'SET_CHARACTERS',
  FETCH_CHARACTERS: 'FETCH_CHARACTERS',
  SET_CHARACTER: 'SET_CHARACTER',
  FETCH_CHARACTER: 'FETCH_CHARACTER'
}


export const ActionCreators = {
  setFetching: (isFetching) => ({type:Actions.SET_FETCHING, isFetching}),
  setCharacters: (characters, offset, limit, total) => ({type:Actions.SET_CHARACTERS, characters, offset, limit, total}),
  setCharacter: (character) => ({type:Actions.SET_CHARACTER, character}),
  fetchCharacter: (id)=> ({type:Actions.FETCH_CHARACTER, id}),
}