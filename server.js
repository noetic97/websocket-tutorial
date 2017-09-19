const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('logged in', (user) => {
    io.emit('logged in', `User ${user} logged in!`);
  })
  
  socket.on('disconnect', () => {
    socket.broadcast.emit('broadcast', `User ${socket.id} has left the building!`)
    console.log(`User ${socket.id} disconnected.`);
  });
});

http.listen(3000, () => {
  console.log('Listening on port: 3000');
});
