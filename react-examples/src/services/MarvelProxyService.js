import ApiClient from "./api-client";
import config from '../config'
import {keys, map, join, keyBy} from 'lodash'

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

const serverClient = new ApiClient({baseURL: 'http://localhost:8085'})
export const getImageUrl = (imageInfo, format) => {
  //return `${imageInfo.path}/${format}.${imageInfo.extension}`
  const url = `${imageInfo.path}/${format}.${imageInfo.extension}`
  const manifestUrl = 'http://localhost:8085/image-manifest?url=' + encodeURIComponent(url)
  serverClient.get(manifestUrl).catch(()=>{})
  return url
}

export class MarvelProxyService {
  constructor() {
    const apiClientConfig = {
      baseURL: baseMarveLUrl,
      withCredentials: false
    }
    this.status = 'online'
    this.statusListeners = []
    this.apiClient = new ApiClient(apiClientConfig)
    this.getComics = this.getComics.bind(this)
    this.getComic = this.getComic.bind(this)
    this.getCharacters = this.getCharacters.bind(this)
    this.getCharacter = this.getCharacter.bind(this)
    this.isDisconnectedError = this.isDisconnectedError.bind(this)
    this.checkService = this.checkService.bind(this)
    this.startCheckService = this.startCheckService.bind(this)
    this.getComicsCached = this.getComicsCached.bind(this)
    this.addStatusListener = this.addStatusListener.bind(this)
    this.notifyStatusListeners = this.notifyStatusListeners.bind(this)
    this.isOnline = this.isOnline.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.getCharactersCached = this.getCharactersCached.bind(this)
    this.getComicCached = this.getComicCached.bind(this)
    this.getCharacterCached = this.getCharacterCached.bind(this)
    this.updateComicsById = this.updateComicsById.bind(this)
    this.updateCharactersById = this.updateCharactersById.bind(this)
    this.startCheckService()
  }
  getComics(offset = 0, limit = 20) {
    if (!this.isOnline()) {
      return this.getComicsCached(offset, limit)
    }
    return this.apiClient.get('comics', null, null , {offset, limit}).then(result => {
      if (result) {
        localStorageCache.setItem({type:'comics', offset, limit}, result)
        const byId = keyBy(result.results, 'id')
        this.updateComicsById(byId)
      }
      return result;
    }).catch(error => {
      if (this.isDisconnectedError(error)) {
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
  updateComicsById(comicsById) {
    let cachedValue = localStorageCache.getItem({type:'comicsById'}) || {}
    cachedValue = {...cachedValue, ...comicsById}
    localStorageCache.setItem({type:'comicsById'}, cachedValue)
  }
  updateCharactersById(charactersById) {
    let cachedValue = localStorageCache.getItem({type:'charactersById'}) || {}
    cachedValue = {...cachedValue, ...charactersById}
    localStorageCache.setItem({type:'charactersById'}, cachedValue)
  }

  getComic(id) {
    if (!this.isOnline()) {
      return this.getComicCached(id)
    }
    return this.apiClient.get('comics', id).then(result => {
      if (result) {
        localStorageCache.setItem({type:'comics', id}, result)
      }
      return result;
    }).catch(error => {
      if (this.isDisconnectedError(error)) {
        return this.getComicCached(id)
      } else {
        throw error
      }
    })
  }
  getComicCached(id) {
    const cachedValue = localStorageCache.getItem({type:'comics', id})
    if(cachedValue) {
      return Promise.resolve(cachedValue)
    } else {
      const comicsById = localStorageCache.getItem({type:'comicsById'})
      if (comicsById && comicsById[id]) {
        return Promise.resolve(comicsById[id])
      }
      return Promise.reject('NOT_IN_CACHE')
    }
  }
  getCharacters(offset = 0, limit = 20) {
    if (!this.isOnline()) {
      return this.getCharactersCached(offset, limit)
    }
    return this.apiClient.get('characters', null, null , {offset, limit}).then(result => {
      if (result) {
        localStorageCache.setItem({type:'characters', offset, limit}, result)
        const byId = keyBy(result.results, 'id')
        this.updateCharactersById(byId)
      }
      return result;
    }).catch(error => {
      if (this.isDisconnectedError(error)) {
        return this.getCharactersCached(offset, limit)
      } else {
        throw error
      }
    })
  }
  getCharactersCached(offset = 0, limit = 20) {
    const cachedValue = localStorageCache.getItem({type:'characters', offset, limit})
    if(cachedValue) {
      return Promise.resolve(cachedValue)
    } else {
      return Promise.reject('NOT_IN_CACHE')
    }
  }
  getCharacter(id) {
    if (!this.isOnline()) {
      return this.getCharacterCached(id)
    }
    return this.apiClient.get('characters', id).then(result => {
      if (result) {
        localStorageCache.setItem({type:'characters', id}, result)
      }
      return result;
    }).catch(error => {
      if (this.isDisconnectedError(error)) {
        return this.getCharacterCached(id)
      } else {
        throw error
      }
    })
  }
  getCharacterCached(id) {
    const cachedValue = localStorageCache.getItem({type:'characters', id})
    if(cachedValue) {
      return Promise.resolve(cachedValue)
    } else {
      const charactersById = localStorageCache.getItem({type:'charactersById'})
      if (charactersById && charactersById[id]) {
        return Promise.resolve(charactersById[id])
      }
      return Promise.reject('NOT_IN_CACHE')
    }
  }
  isDisconnectedError(error) {
    this.setStatus('offline')
    return error.message === 'Network Error'

  }
  startCheckService() {
    setInterval(this.checkService, 5000)
  }
  checkService() {
    return this.apiClient.get('test').then(() => {
      this.setStatus('online')
    }).catch((error)=> {
      console.log("Erreur Marvel service test " + error)
      this.setStatus('offline')
    })
  }
  isOnline() {
    return this.status === 'online'
  }
  setStatus(status) {
    const changed = this.status !== status
    this.status = status
    if (changed) {
      if(this.isOnline()) {
        console.log('Service is up')
      } else {
        console.log('Service is down')
      }
      this.notifyStatusListeners()
    }
  }
  addStatusListener(listener) {
    this.statusListeners.push(listener)
    listener(this.status)
  }
  notifyStatusListeners() {
    this.statusListeners.forEach(listener => {
      listener(this.status)
    })
  }
}

const marvelServiceInstance = new MarvelProxyService()
export const getInstance = () => marvelServiceInstance

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
