import express from 'express'
import {MarvelService} from './service/marvel-service'

const port = 8090
const app = express()

const marvelSvc = new MarvelService()

const cache = {}


app.get('/marvel/comics', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  const cacheKey = req.originalUrl
  const offset = req.query.offset || 0
  const limit = req.query.limit || 10
  if (cache[cacheKey]) {
    res.json(cache[cacheKey])
  } else {
    marvelSvc.getComics(offset, limit).then(result => {
      cache[cacheKey] = result.data
      res.json(result.data)
    }).catch(error => {
      res.status(error.response.status).json(error.response.data)
    })
  }
})

app.get('/marvel/comics/:id', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  var id = req.params.id;
  const cacheKey = req.originalUrl
  if (cache[cacheKey]) {
    res.json(cache[cacheKey])
  } else {
    marvelSvc.getComic(id).then(result => {
      const comis = result.data.results[0]
      cache[cacheKey] = comis
      res.json(comis)
    }).catch(error => {
      res.status(error.response.status).json(error.response.data)
    })
  }
})

app.get('/marvel/characters', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  const offset = req.query.offset || 0
  const limit = req.query.limit || 10
  const cacheKey = req.originalUrl
  if (cache[cacheKey]) {
    res.json(cache[cacheKey])
  } else {
    marvelSvc.getCharacters(offset, limit).then(result => {
      cache[cacheKey] = result.data
      res.json(result.data)
    }).catch(error => {
      res.status(error.response.status).json(error.response.data)
    })
  }
})


app.get('/marvel/characters/:id', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  var id = req.params.id;
  const cacheKey = req.originalUrl
  if (cache[cacheKey]) {
    res.json(cache[cacheKey])
  } else {
    marvelSvc.getCharacter(id).then(result => {
      const character = result.data.results[0]
      cache[cacheKey] = character
      res.json(character)
    }).catch(error => {
      res.status(error.response.status).json(error.response.data)
    })
  }
})

console.log('listening on port ' + port)
app.listen(port)