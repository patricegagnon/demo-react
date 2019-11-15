import express from 'express'
const port = 8085
const app = express()
import fs from 'fs'

const html = fs.readFileSync('./dist/index.html', 'utf8')

app.use('/public', express.static('./dist/public'))
app.use('/app.js.map', express.static('./dist/app.js.map'))
app.use('/app.js', express.static('./dist/app.js'))
app.get('/*', function(req, res) {
  res.send(html);
});
app.listen(port)
console.log('Listening on port ' + port)
