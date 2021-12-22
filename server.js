const moment=require('moment')
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {
  socket.on("message", data => {
    console.log(data)
    socket.to(data.room).emit("chat", data);
  });
  //joining Room
  socket.on("join_room", ({ room, name }) => {
    socket.join(room);
    socket
      .to(room)
      .emit("chat", { name, message: `${name} has joined the room!` });
  });
});

server.listen(4000, () => {
  console.log("server is listening at 4000...");
});
