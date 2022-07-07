const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3005 });

wss.on('connection', (ws) => {
  console.log('one client is connected');
  // 接收消息
  ws.on('message', function (msg) {
    console.log(msg.toString());
    // 发送消息给客户端
    // ws.send(msg.toString())
    // 广播消息
    wss.clients.forEach((client) => {
      // 判断非自己的客户端
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
