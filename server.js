const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')

const port = process.env.PORT || 3001
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.resolve(__dirname, 'client', 'build')))

app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

io.on('connection', socket => {
    console.log('Client connected')
    socket.emit('connected')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port)