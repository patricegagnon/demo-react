import express from 'express'
const port = 5052
const app = express()
import fs from 'fs'

const html = fs.readFileSync('./dist/index.html', 'utf8')

app.use('/public', express.static('./dist/public'))
app.use('/index.js', express.static('./dist/index.js'))
app.get('/*', function(req, res) {
  res.send(html);
});
app.listen(port)
console.log('Listening on port ' + port)
