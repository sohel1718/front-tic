const io = require('socket.io')(8000)

 io.on("connection", socket => {
     console.log(socket.id);
 })