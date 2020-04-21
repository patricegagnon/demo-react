import MarvelService, {getInstance} from "../../services/MarvelProxyService";


export const Actions = {
  SET_MARVEL_SERVICE_STATUS: 'SET_MARVEL_SERVICE_STATUS'
}


export const ActionCreators = {
  setMarvelServiceStatus: (status) => ({type:Actions.SET_MARVEL_SERVICE_STATUS, status}),

}