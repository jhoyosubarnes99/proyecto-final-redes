// APIS
const path = require('path');
const express = require('express');
const app = express();
const socket = require('socket.io');


//configuraciones
app.set('port', process.env.PORT || 3000);

// Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// arrancar el servidor
const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});


// WebSockets
const io = socket(server);
io.on('connection', (socket) => {
  console.log('socket connection opened:', socket.id);
  
  socket.on('chat:message', function(data) {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', function(data) {
    socket.broadcast.emit('chat:typing', data);
  });
});




