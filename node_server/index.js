//NODE SERVER WHICH WILL HANDLE SOCKET IO CONNECTION
const io = require("socket.io")(8000);

const users = {};
io.on("connection", (socket) => {//handles all conections to server
  socket.on("new-user-joined", names => {//handle user's connections
    console.log("user joined", names);
    users[socket.id] = names; //every user has different id
    socket.broadcast.emit("user-joined", names); //it will emit to all user except sender
  });
  socket.on("send", message => {
    socket.broadcast.emit('receive', {message: message, names: users[socket.id]});
  });

  socket.on('disconnect',(message)=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
  })
});
