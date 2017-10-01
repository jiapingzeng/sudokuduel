const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res, next) => {
    res.sendStatus(200)
})

io.on('connection', socket => {
    console.log('Client connected')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port)