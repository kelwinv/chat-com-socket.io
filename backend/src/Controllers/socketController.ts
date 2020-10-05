import socketIo from "socket.io";

interface Props extends socketIo.Socket {
  userName: string;
}

let userConnected = 0;

export default {
  connetion(socket: Props) {
    console.log("connected on server");
    let addedUser = false;
    userConnected++;
    console.log(`${userConnected} users online`);


    socket.on("add user", (username) => {
      if(addedUser) return;
      socket.userName = username;
      console.log(`${socket.userName} has connected on chat`);

      socket.emit("login", {isAuth: true,userName: socket.userName});
      addedUser = true;
      socket.broadcast.emit("user joined", { username: socket.userName });
    });

    socket.on("disconnect", () => {
      userConnected--;
      console.log(`user has disconnected to server, ${userConnected} users online`);
    });
  },
};
