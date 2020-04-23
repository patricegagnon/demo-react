import {Actions} from './actions'

export const comicInitialState = {
  isFetching: false,
  comics: [],
  comic: null,
  offset: 0,
  limit: 10,
  total: 0
}

export const comicsReducer = (state = comicInitialState, action = {}) => {
  switch(action.type) {
    case Actions.SET_FETCHING:
      return {...state, isFetching: action.isFetching}
    case Actions.SET_COMICS:
      return {...state, comics: action.comics, offset: action.offset, limit: action.limit, total: action.total}
    case Actions.SET_COMIC:
      return {...state, comic: action.comic}
    default:
      return state
  }
}
