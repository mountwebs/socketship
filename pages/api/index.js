import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      io.emit("new player");
      socket.on("new player", () => {
        // socket.broadcast.emit("new player");
      });

      socket.on("chat-message", (msg) => {
        io.emit("chat-message", msg);
      });

      socket.on("BOMBING", (squareIndex) => {
        socket.broadcast.emit("wasBombed", squareIndex);
      });

      socket.on("leaving", () => {
        socket.broadcast.emit("player leaving");
      });
    });
  }
  res.end();
};

export default SocketHandler;
