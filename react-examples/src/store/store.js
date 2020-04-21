import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import comisSagas from './comics/saga'
import charactersSagas from './characters/saga'
import {comicsReducer, comicInitialState} from './comics/reducers'
import {charactersReducer, characterInitialState} from './characters/reducers'

const sagaMiddleware = createSagaMiddleware()
let devToolsExtension = f => f

if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

export default (initialState = comicInitialState) => {
  const store = createStore(comicsReducer, initialState, compose(
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
    devToolsExtension
  ))

  store.runSaga = sagaMiddleware.run
  store.runSaga(comisSagas)
  //store.runSaga(charactersSagas)
  return store
}
