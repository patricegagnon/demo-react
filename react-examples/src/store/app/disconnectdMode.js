import {ActionCreators as AppActionCreators} from './actions'
import {getInstance} from '../../services/MarvelProxyService'

export const initDisconnectedMode = (store) => {
  const marvelService = getInstance()

  const onMarvelServiceStatusChange = (status) => {
    store.dispatch(AppActionCreators.setMarvelServiceStatus(status))
  }

  marvelService.addStatusListener(onMarvelServiceStatusChange)
}


