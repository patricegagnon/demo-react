import { all, takeEvery, call, put, select } from 'redux-saga/effects'
import {
  Actions,
  ActionCreators
} from './actions'
import MarvelService from "../../services/MarvelProxyService";
function * logActionsSaga(action) {
  if (action && action.type) {
    console.log('Action was diaptched: ' + JSON.stringify(action))
  }
}


const marvelService = new MarvelService()

function * mainSaga(action) {
  try{
    console.log('getComic with Saga')
    yield put(ActionCreators.setFetching(true))
    const response = yield call(marvelService.getComic, action.id)
    yield put(ActionCreators.setComic(response))
  } catch (error) {
    console.log('Error in mailSaga ' + error)
  } finally {
    yield put(ActionCreators.setFetching(false))
  }
}

export default function * rootSaga () {
  const listener1 = takeEvery('*', logActionsSaga)
  const listener2 = takeEvery([Actions.FETCH_COMIC], mainSaga)
  yield all([listener1, listener2])
}
