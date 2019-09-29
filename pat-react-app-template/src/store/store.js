import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {charactersReducer, characterInitialState} from './characters/reducers'

let devToolsExtension = f => f

if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

export default (initialState = {}) => {
  const store = createStore(charactersReducer, characterInitialState, compose(
    devToolsExtension
  ))


  return store
}
