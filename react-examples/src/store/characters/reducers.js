import {Actions} from './actions'

export  const characterInitialState = {
  isFetching: false,
  characters: [],
  character: null,
  offset: 0,
  limit: 10,
  total: 0
}

export const unavailableCharacters = {
  name: 'Non disponible',
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
    extension: "jpg"
  }
}

export const charactersReducer = (state = characterInitialState, action = {}) => {
  switch(action.type) {
    case Actions.SET_FETCHING:
      return {...state, isFetching: action.isFetching}
    case Actions.SET_CHARACTERS:
      return {...state, characters: action.characters, offset: action.offset, limit: action.limit, total: action.total}
    case Actions.SET_CHARACTER:
      return {...state, character: action.character}
    default:
      return state
  }
}