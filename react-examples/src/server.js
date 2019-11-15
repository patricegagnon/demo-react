import express from 'express'
const port = 8085
const app = express()
import fs from 'fs'
import {join} from 'lodash'

const html = fs.readFileSync('./dist/index.html', 'utf8')

const cacheGen = fs.readFileSync('./dist/caching/cache.appcache.gen', 'utf8')
const cacheGenEntries = cacheGen.split('\n')


app.use('/public', express.static('./dist/public'))
app.use('/app.js.map', express.static('./dist/app.js.map'))
app.use('/app.js', express.static('./dist/app.js'))
app.use('/', express.static('./dist/app.js'))

app.get('/gen/cache.appcache', function(req, res) {
  res.set('content-type', 'text/cache-manifest; charset=UTF-8')
  const cacheBase = fs.readFileSync('./dist/caching/cache.appcache.base', 'utf8')
  const cacheGenCurrent = getCacheEntriesFileContent()
  const cacheManifest = cacheBase.replace('${genEntries}', cacheGenCurrent)
  res.send(cacheManifest);
});



app.get('/image-manifest', function(req, res) {
  const imageUrl = req.query.url
  console.log("image-manifest:" + imageUrl)
  if (cacheGenEntries.indexOf(imageUrl) === -1) {
    cacheGenEntries.push(imageUrl)
  }
  res.send("ok");
});

app.get('/*', function(req, res) {
  res.send(html);
});
app.listen(port)
console.log('Listening on port ' + port)

const updateGenCacheEntries = () => {
  console.log('updateGenCacheEntries')
  const newFileContent= getCacheEntriesFileContent()
  fs.writeFile('./dist/caching/cache.appcache.gen', newFileContent, 'utf8', ()=>{})
}

const getCacheEntriesFileContent = () => {
  const newFileContent = join(cacheGenEntries, '\n')
  return newFileContent
}
setInterval(updateGenCacheEntries,5000)