import {createStore, applyMiddleware, compose} from 'redux'

import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import {charactersReducer, characterInitialState } from './characters/reducers'
import {comicsReducer, comicInitialState } from './comics/reducers'
let devToolsExtension = f => f
if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

const initialState = {}


const init = () => {
  const reducers = combineReducers(
    {
      comics: comicsReducer,
      characters: charactersReducer,
    }
  )
  const store = createStore(reducers, {},
    compose(
      applyMiddleware(thunk),
      devToolsExtension
    ))
  return store
}

export default init
