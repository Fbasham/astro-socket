const express = require('express')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:3000'
  }
})

io.on('connection', socket=>{
  socket.on('join-room', room => {
    socket.join(room)
  })

  socket.on('msg-to-server', ({msg,room}) => {
    io.to(room).emit('msg-from-server', msg)
  })
})


server.listen(5500)