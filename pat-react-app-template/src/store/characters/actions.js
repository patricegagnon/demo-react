import MarvelService from '../../services/MarvelProxyService'
import {createActions} from '../baseActions'

export const Actions = createActions('characters',{
  SET_FETCHING: 'SET_FETCHING',
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_CHARACTER: 'SET_CHARACTER'
})


const marvelService = new MarvelService()

export const ActionCreators = {
  setFetching: (isFetching) => ({type:Actions.SET_FETCHING, isFetching}),
  setCharacters: (characters, offset, limit, total) => ({type:Actions.SET_CHARACTERS, characters, offset, limit, total}),
  setCharacter: (character) => ({type:Actions.SET_CHARACTER, character}),
  fetchCharacters: (offset, limit) => (dispatch) => {
    dispatch(ActionCreators.setFetching(true))
    marvelService.getCharacters(offset, limit).then((response) => {
      dispatch(ActionCreators.setCharacters( response.results, response.offset, response.limit, response.total))
    }).catch(error => {
      console.error('MarvelCharacters error: ' + error)
    }).finally(() => {
      dispatch(ActionCreators.setFetching(false))
    })
  },
  fetchCharacter: (id) => (dispatch) => {
    dispatch(ActionCreators.setFetching(true))
    marvelService.getCharacter(id).then((response) => {
      dispatch(ActionCreators.setCharacter( response))
    }).catch(error => {
      console.error('MarvelCharacter error: ' + error)
    }).finally(() => {
      dispatch(ActionCreators.setFetching(false))
    })
  }

}
