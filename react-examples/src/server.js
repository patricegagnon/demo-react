import express from 'express'
const port = 8085
const app = express()


app.use('/public', express.static('./dist/public'))
app.use('/app.js.map', express.static('./dist/app.js.map'))
app.use('/app.js', express.static('./dist/app.js'))
app.use('/', express.static('./dist/app.js'))


app.get('/*', function(req, res) {
  res.send(html);
});
app.listen(port)
console.log('Listening on port ' + port)
