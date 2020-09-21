'use strict'

const express = require('express')

const app = express()
app.use(express.static('dist'))
app.static('tp.css')

// CORS for development
// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const dao = require('./src')
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/test', function (request, res) {
    let responseTest = 0
    // res.setHeader('Content-Type', 'application/json')

    res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })

    dao.connect()

    dao.query('select title from playlist;', [], (result) => {
        responseTest = JSON.parse(result)
    })
    res.send(JSON.stringify(responseTest))
})

app.get('/paylist', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
