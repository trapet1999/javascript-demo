const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a socket is connected')
  // 接收客户端来自chatEvent事件的消息
  socket.on('chatEvent', msg => {
    console.log('msg from client:', msg);
    // 给对应客户端发送消息
    // socket.send('server say:'+ msg)
    // 广播消息，除了对应的客户端都发送
    socket.broadcast.emit('ServerMsg', msg)
  })
})

http.listen(3005, () => {
  console.log('server is running 3005')
})