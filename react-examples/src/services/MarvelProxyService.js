import ApiClient from "./api-client";
import config from '../config'
import {keys, map, join} from 'lodash'

const baseMarveLUrl = config.marvelProxyServiceBaseUrl //'http://localhost:8090/marvel'
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
    this.isDisconnected = this.isDisconnected.bind(this)
    this.checkService = this.checkService.bind(this)
    this.startCheckService = this.startCheckService.bind(this)
    this.getComicsCached = this.getComicsCached.bind(this)
    this.offlineMode = false
    this.startCheckService()
  }

  getComics(offset = 0, limit = 20) {
    if (this.offlineMode) {
      return this.getComicsCached(offset, limit)
    }
    return this.apiClient.get('comics', null, null , {offset, limit}).then(result => {
      if (result) {
        localStorageCache.setItem({type:'comics', offset, limit}, result)
      }
      return result;
    }).catch(error => {
      if (this.isDisconnected(error)) {
        return this.getComicsCached(offset, limit)
      } else {
        throw error
      }
    })

  }
  getComicsCached(offset = 0, limit = 20) {
    const cachedValue = localStorageCache.getItem({type:'comics', offset, limit})
    if(cachedValue) {
      return Promise.resolve(cachedValue)
    } else {
      return Promise.reject('NOT_IN_CACHE')
    }
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
  isDisconnected(error) {
    this.offlineMode = false
    return error.message === 'Network Error'

  }
  startCheckService() {
    setInterval(this.checkService, 5000)
  }
  checkService() {
    return this.apiClient.get('test').then(() => {
      if (this.offlineMode) {
        console.log('Service is up')
        this.offlineMode = false
      }
    }).catch(()=> {
      console.log('Service is down')
      this.offlineMode = true
    })
  }
}



class LocalStorageCache {
  constructor() {
    this.buildKey = this.buildKey.bind(this)
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
  }
  buildKey(params) {
   return join(map(keys(params), key => `${key}=${params[key]}`), '.')
  }
  getItem(params) {
    const key = this.buildKey(params)
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
    return null
  }
  setItem(params, value) {
    const key = this.buildKey(params)
    return localStorage.setItem(key, JSON.stringify(value))
  }
}



const localStorageCache = new LocalStorageCache()

export default MarvelProxyService
