//This is server side

const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});
console.log("Server up");
const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (username) => {
    console.log("new user", username);
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
});
