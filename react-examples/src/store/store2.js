import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import comisSagas from './comics/saga'
import charactersSagas from './characters/saga'
import {comicsReducer} from './comics/reducers'
import {appReducer} from './app/reducers'
import {charactersReducer} from './characters/reducers'
import { combineReducers } from 'redux'
import {initDisconnectedMode} from './app/disconnectdMode'
import { reducer as formReducer } from 'redux-form'
const sagaMiddleware = createSagaMiddleware()
let devToolsExtension = f => f

if (process.env.NODE_ENV !== 'production') {
  devToolsExtension = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
      actionsBlacklist: ['@@redux-form/REGISTER_FIELD']
    }) : (f) => f
}

function * rootCombinesSagas () {
  yield * comisSagas()
  yield * charactersSagas()
}

export default (initialState = {}) => {
  const reducers = combineReducers(
    {
      app: appReducer,
      comics: comicsReducer,
      characters: charactersReducer,
      form: formReducer
    }
 )
  const store = createStore(reducers, initialState, compose(
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
    devToolsExtension
  ))

  initDisconnectedMode(store)

  store.runSaga = sagaMiddleware.run
  store.runSaga(rootCombinesSagas)
  return store
}
