import ApiClient from "./api-client";
import {buildNewRequestMarvelAuthParams} from "./auth-utils"
import config from '../config'

console.log('Config ' + JSON.stringify(config))

const {publicKey, privateKey} = config

export class MarvelService {
  constructor() {
    const apiClientConfig = {
      baseURL: config.baseMarveLUrl
    }
    this.apiClient = new ApiClient(apiClientConfig)
    this.getComics = this.getComics.bind(this)
    this.getCharacters = this.getCharacters.bind(this)
    this.getCharacter = this.getCharacter.bind(this)
  }

  getComics(offset, limit) {
    return this.apiClient.get('comics', null, null, {...buildNewRequestMarvelAuthParams(privateKey, publicKey), offset, limit})
  }

  getComic(id) {
    return this.apiClient.get('comics', id, null, buildNewRequestMarvelAuthParams(privateKey, publicKey))
  }

  getCharacters(offset, limit) {
    return this.apiClient.get('characters', null, null, {...buildNewRequestMarvelAuthParams(privateKey, publicKey), offset, limit})
  }

  getCharacter(id) {
    return this.apiClient.get('characters', id, null, buildNewRequestMarvelAuthParams(privateKey, publicKey))
  }
}

