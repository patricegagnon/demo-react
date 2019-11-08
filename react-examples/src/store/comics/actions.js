import MarvelService from "../../services/MarvelProxyService";
import {createActions} from '../baseActions'
/*
export const Actions = createActions('comics',{
  SET_FETCHING: 'SET_FETCHING',
  SET_COMICS: 'SET_COMICS',
  FETCH_COMICS: 'FETCH_COMICS',
  SET_COMIC: 'SET_COMIC',
  FETCH_COMIC: 'FETCH_COMIC'
})
*/

export const Actions = {
  SET_FETCHING: 'SET_FETCHING',
  SET_COMICS: 'SET_COMICS',
  FETCH_COMICS: 'FETCH_COMICS',
  SET_COMIC: 'SET_COMIC',
  FETCH_COMIC: 'FETCH_COMIC'
}

const marvelService = new MarvelService()

export const ActionCreators = {
  setFetching: (isFetching) => ({type:Actions.SET_FETCHING, isFetching}),
  setComics: (comics, offset, limit, total) => ({type:Actions.SET_COMICS, comics, offset, limit, total}),
  setComic: (comic) => ({type:Actions.SET_COMIC, comic}),
  fetchComic: (id)=> ({type:Actions.FETCH_COMIC, id}),
  fetchPageDataWithThunk: (offset, limit) => (dispatch) => {
    dispatch(ActionCreators.setFetching(true))
    marvelService.getComics(offset, limit).then((response) => {
      dispatch(ActionCreators.setComics( response.results, response.offset, response.limit, response.total))
    }).catch(error => {
      if (error === 'NOT_IN_CACHE') {
        alert("Vous êtes en mode non connecté et l'information demandée n'est pas disponible")
      }
      console.error('MarvelComics error: ' + error)
    }).finally(() => {
      dispatch(ActionCreators.setFetching(false))
    })
  }
}