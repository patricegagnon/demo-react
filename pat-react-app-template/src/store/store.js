import {createStore, applyMiddleware, compose} from 'redux'
import {charactersReducer, } from './characters/reducers'
import {comicsReducer } from './comics/reducers'
import { combineReducers } from 'redux'

import thunk from 'redux-thunk';

let devToolsExtension = f => f

if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

export default () => {
  const reducers = combineReducers(
    {
      comics: comicsReducer,
      characters: charactersReducer
    }
  )
  const store = createStore(reducers, {}, compose(
    applyMiddleware(thunk),
    devToolsExtension
  ))
  return store
}
