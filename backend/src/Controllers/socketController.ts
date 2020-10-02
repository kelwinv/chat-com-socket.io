import socketIo from "socket.io";

interface Props extends socketIo.Socket {
  userName: string;
}

export default {
  connetion(socket: Props) {
    console.log("connected on server");
    let addedUser = false;


    socket.on("add user", (username) => {
      if(addedUser) return;
      socket.userName = username;
      console.log(`${socket.userName} has connected on chat`);

      socket.emit("login", {isAuth: true,userName: socket.userName});
      addedUser = true;
      socket.broadcast.emit("user joined", { username: socket.userName });
    });

    socket.on("disconnect", () => {
      console.log(`${socket.userName} has disconnected to server`);
    });
  },
};
