import socketIo from "socket.io";
import { io } from '../server';

interface Props extends socketIo.Socket {
  userName: string;
}

interface mensagensBoxList {
  author: string;
  message: string;
  id: number;
}

let numUserConnected = 0;
let usersList = [];
let messageId = 0;


const mensagensBoxList: mensagensBoxList[] = [];

function joinInChat(socket: Props) {
  io.in('chat').emit("get users", usersList);

  socket.emit("get messagens", mensagensBoxList);
  console.log(`${socket.userName} has connected on chat`);
}

export default {
  connetion(socket: Props) {
    let addedUser = false;

    numUserConnected++;
    console.log(`${numUserConnected} users online`);

    socket.on("add user", (userName) => {
      if (usersList.find((user) => user === userName)) {
        socket.emit("auth fail", true);
        return;
      }

      if (addedUser) return;

      socket.emit("login", { isAuth: true, userName });
      socket.join("chat");

      addedUser = true;
      socket.userName = userName;
      usersList.push(userName);

      socket.broadcast.emit("user joined", { userName });

      joinInChat(socket);
    });

    socket.on("send message", ({ author, message }) => {
      const MemessageBox = { author, message, id: messageId };

      messageId++;

      io.in('chat').emit("new message", MemessageBox);
      mensagensBoxList.push(MemessageBox);
    });

    socket.on("disconnect", () => {
      numUserConnected--;
      usersList = usersList.filter((user) => user !== socket.userName);
      io.in('chat').emit("get users", usersList);

      console.log(
        `user has disconnected to server, ${numUserConnected} users online`
      );
    });
  },
};
