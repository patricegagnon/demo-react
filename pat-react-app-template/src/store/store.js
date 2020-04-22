import {createStore, applyMiddleware, compose} from 'redux'
import {charactersReducer, characterInitialState} from './characters/reducers'

import thunk from 'redux-thunk';

let devToolsExtension = f => f

if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

export default () => {
  const store = createStore(charactersReducer, characterInitialState, compose(
    applyMiddleware(thunk),
    devToolsExtension
  ))
  return store
}
