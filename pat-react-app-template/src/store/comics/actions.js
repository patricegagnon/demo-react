import MarvelService from "../../services/MarvelProxyService";
import {createActions} from '../store-utils'

export const Actions = createActions('comics',{
  SET_FETCHING: 'SET_FETCHING',
  SET_COMICS: 'SET_COMICS',
  SET_COMIC: 'SET_COMIC',
})

const marvelService = new MarvelService()

export const ActionCreators = {
  setFetching: (isFetching) => ({type:Actions.SET_FETCHING, isFetching}),
  setComics: (comics, offset, limit, total) => ({type:Actions.SET_COMICS, comics, offset, limit, total}),
  setComic: (comic) => ({type:Actions.SET_COMIC, comic}),
  fetchComic: (id)=> (dispatch) => {
    dispatch(ActionCreators.setFetching(true))
    marvelService.getComic(id).then((response) => {
      dispatch(ActionCreators.setComic(response))
    }).catch(error => {
      console.error('MarvelComic error: ' + error)
    }).finally(() => {
      dispatch(ActionCreators.setFetching(false))
    })
  },
  fetchPageData: (offset, limit) => (dispatch) => {
    dispatch(ActionCreators.setFetching(true))
    marvelService.getComics(offset, limit).then((response) => {
      dispatch(ActionCreators.setComics( response.results, response.offset, response.limit, response.total))
    }).catch(error => {
      console.error('MarvelComics error: ' + error)
    }).finally(() => {
      dispatch(ActionCreators.setFetching(false))
    })
  }
}
