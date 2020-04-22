import ApiClient from "./api-client";

const baseMarveLUrl = envConfig.marvelProxyServiceBaseUrl

export const MarvelImageFormats = {
  portrait_small: 'portrait_small',
  portrait_medium: 'portrait_medium',
  portrait_xlarge: 'portrait_xlarge',
  portrait_fantastic: 'portrait_fantastic',
  portrait_uncanny: 'portrait_uncanny',
  portrait_incredible: 'portrait_incredible',
  standard_small: 'standard_small',
  standard_medium: 'standard_medium',
  standard_large: 'standard_large',
  standard_xlarge: 'standard_xlarge',
  standard_fantastic: 'standard_fantastic',
  standard_amazing: 'standard_amazing',
  landscape_small: 'landscape_small',
  landscape_medium: 'landscape_medium',
  landscape_large: 'landscape_large',
  landscape_xlarge: 'landscape_xlarge',
  landscape_amazing: 'landscape_amazing',
  landscape_incredible: 'landscape_incredible'
}

export const getImageUrl = (imageInfo, format) => {
  return `${imageInfo.path}/${format}.${imageInfo.extension}`
}

export class MarvelProxyService {
  constructor() {
    const apiClientConfig = {
      baseURL: baseMarveLUrl,
      withCredentials: false
    }
    this.apiClient = new ApiClient(apiClientConfig)
    this.getComics = this.getComics.bind(this)
    this.getComic = this.getComic.bind(this)
    this.getCharacters = this.getCharacters.bind(this)
    this.getCharacter = this.getCharacter.bind(this)
    this.getTodos = this.getTodos.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
  }

  getComics(offset = 0, limit = 20) {
    return this.apiClient.get('comics', null, null , {offset, limit})
  }
  getComic(id) {
    return this.apiClient.get('comics', id)
  }
  getCharacters(offset = 0, limit = 20) {
    return this.apiClient.get('characters', null, null , {offset, limit})
  }
  getCharacter(id) {
    return this.apiClient.get('characters', id)
  }
  getTodos() {
    return this.apiClient.get('todos')
  }
  updateTodos(todos) {
    return this.apiClient.post('todos', todos)
  }
}

export default MarvelProxyService


const marvelServiceInstance = new MarvelProxyService()
export const getInstance = () => marvelServiceInstance
