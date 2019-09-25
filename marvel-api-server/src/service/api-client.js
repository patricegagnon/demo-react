import {endsWith, isArray, size} from 'lodash'
import axios from 'axios'

export const checkStatus = (response) => {
  return response.status >= 200 && response.status < 300
}

function getUrlWithId(url, id) {
  if (id) {
    return endsWith(url, '/') ? `${url}${id}` : `${url}/${id}`
  }
  return url
}

/*
function handleAxiosError (error) {
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  console.log(error.config.js)
  throw error
}
*/
export const callAxios = (config, errorCenter) => {
  return axios.request(config)
    .then(res => {
      return res.data
    })
//    .catch(handleAxiosError)
}

function serialize(obj, headers) {
  let ret = obj
  // note : pour les GET, obj est undefined
  if (obj && headers['Content-Type'] === 'application/json') {
    ret = JSON.stringify(ret)
  }

  return ret
}

function deserialize(data, headers) {
  if (!data || data === '') {
    return null
  }
  if (headers['content-type'].indexOf('application/json') !== -1) {
    return JSON.parse(data)
  } else {
    return data
  }
}

export default class ApiClient {
  constructor(baseConfig) {
    if (!baseConfig.baseURL) {
      throw new Error('baseConfig must have a baseURL defined')
    }

    this.axiosConfig = {
      ...baseConfig,
      checkStatus: checkStatus,
      transformRequest: serialize,
      transformResponse: deserialize,
      withCredentials: true,
      maxRedirects: 0
    }

    this.axiosConfig.headers = this.axiosConfig.headers || {}

    this.setCsrfToken = this.setCsrfToken.bind(this)
    this.get = this.get.bind(this)
    this.put = this.put.bind(this)
    this.post = this.post.bind(this)
    this.patch = this.patch.bind(this)
    this.delete = this.delete.bind(this)
    this.list = this.list.bind(this)
    this.manageXhrRequest = this.manageXhrRequest.bind(this)
    this.getBaseURL = this.getBaseURL.bind(this)
  }

  setCsrfToken(token) {
    this.axiosConfig.headers['X-CSRF-TOKEN'] = token
  }

  getBaseURL() {
    return this.axiosConfig.baseURL
  }

  get(url, id, callHeaders, params) {
    if (id) {
      url = getUrlWithId(url, id)
    }
    const config = {...this.axiosConfig, method: 'get', url}
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    if (params) {
      config.params = params
    }
    return callAxios(config)
  }

  list(url, filters, callHeaders, params) {
    if (size(filters) > 0) {
      url = url + buildQueryForUrl(filters)
    }
    const config = {...this.axiosConfig, method: 'get', url}
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    if (params) {
      config.params = params
    }
    return callAxios(config)
  }

  put(url, data, id, callHeaders) {
    if (id) {
      url = getUrlWithId(url, id)
    }
    const config = {...this.axiosConfig, method: 'put', url, data}
    config.headers['Content-Type'] = 'application/json'
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    return callAxios(config)
  }

  patch(url, data, id, callHeaders) {
    url = getUrlWithId(url, id)
    const config = {...this.axiosConfig, method: 'patch', url, data}
    config.headers['Content-Type'] = 'application/json'
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    return callAxios(config)
  }

  post(url, data, callHeaders) {
    const config = {...this.axiosConfig, method: 'post', url, data}
    config.headers['Content-Type'] = 'application/json'
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    return callAxios(config)
  }

  delete(url, ids, callHeaders) {
    const config = {...this.axiosConfig, method: 'delete'}
    if (isArray(ids)) {
      config.url = url
      config.data = ids
      config.headers['Content-Type'] = 'application/json'
    } else {
      config.url = getUrlWithId(url, ids)
    }
    if (callHeaders) {
      config.headers = {...config.headers, ...callHeaders}
    }
    return callAxios(config)
  }

  manageXhrRequest(url) {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', this.axiosConfig.baseURL + url)
    xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    xhr.responseType = 'blob'
    xhr.withCredentials = true

    xhr.onload = () => {
      let blob = new Blob([xhr.response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      // Required to enable downloads on Microsoft's browsers
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        let fileName = new Date().valueOf() + '.xlsx'
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        let downloadUrl = URL.createObjectURL(blob)
        window.location.href = downloadUrl
      }
    }
    xhr.send()
  }
}

const buildQueryForUrl = (filterParams) => {
  const query = []
  for (let fieldName in filterParams) {
    const fieldValue = filterParams[fieldName]
    if (fieldValue && fieldValue !== '') {
      const param = `${fieldName}=${fieldValue}`
      query.push(param)
    }
  }
  const urlParams = `?${query.join('&')}`
  return urlParams
}