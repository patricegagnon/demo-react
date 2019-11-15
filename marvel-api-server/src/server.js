import express from 'express'

import bodyParser from 'body-parser'
import {cleanCharactersResultData, cleanComisResultData, MarvelService} from './service/marvel-service'

const port = 8090
const app = express()

const marvelSvc = new MarvelService()

const cache = {}
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})
app.get('/marvel/comics', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  const cacheKey = req.originalUrl
  const offset = req.query.offset || 0
  const limit = req.query.limit || 10
  if (cache[cacheKey]) {
    res.json(cache[cacheKey])
  } else {
    marvelSvc.getComics(offset, limit).then(result => {
      const data = cleanComisResultData(result.data)
      cache[cacheKey] = data
      res.json(data)
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
      const data = cleanCharactersResultData(result.data)
      cache[cacheKey] = data
      res.json(data)
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

app.get('/marvel/test', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.json({status: 'online'})
})

app.post('/marvel/form', function (req, res) {

  res.set('Access-Control-Allow-Origin', '*')
 console.log('formSubmitted : ' + JSON.stringify(req.body))
  res.json({status: 'received'})
})

console.log('listening on port ' + port)
app.listen(port)