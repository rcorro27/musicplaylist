'use strict'

const express = require('express')

const app = express()
app.use(express.static('dist'))

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

const USERS = [
    {
        userName: 'mvachon'
    },
    {
        userName: 'patate'
    },
    {
        userName: 'gcote'
    },
    {
        userName: 'fmartineau'
    },
    {
        userName: 'mstpierre'
    },
    {
        userName: 'msimard'
    },
    {
        userName: 'agermain'
    }
]

app.get('/index', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
