import {Actions} from './actions'

export  const characterInitialState = {
  marvelServiceStatus: 'online'
}

export const appReducer = (state = characterInitialState, action = {}) => {
  switch(action.type) {
    case Actions.SET_MARVEL_SERVICE_STATUS:
      return {...state, marvelServiceStatus: action.status}
    default:
      return state
  }
}