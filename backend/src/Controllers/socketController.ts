import socketIo from "socket.io";
import { io } from "../server";

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
let messageString = 0;
let MessageSpawn = false;

const mensagensBoxList: mensagensBoxList[] = [];

function joinInChat(socket: Props) {
  io.in("chat").emit("get users", usersList);

  socket.emit("get messagens", mensagensBoxList);
  console.log(`${socket.userName} has connected on chat`);
}

function handleMessageSpawn() {
  setInterval(() => {
    messageString = 0;
    MessageSpawn = false;
  }, 4000);
  if (messageString >= 3) {
    MessageSpawn = true;
  }
}

export default {
  connetion(socket: Props) {

    numUserConnected++;
    console.log(`${numUserConnected} users online`);

    socket.on("add user", (userName) => {
      if (usersList.find((user) => user === userName)) {
        socket.emit("auth fail", true);
        return;
      }

      socket.emit("login", { isAuth: true, userName });
      socket.join("chat");

      socket.userName = userName;
      usersList.push(userName);

      socket.broadcast.emit("user joined", userName);

      joinInChat(socket);
    });

    socket.on("send message", ({ author, message }) => {
      if (MessageSpawn) return;
      const MemessageBox = { author, message, id: messageId };
      messageString++;
      handleMessageSpawn();

      messageId++;

      io.in("chat").emit("new message", MemessageBox);
      mensagensBoxList.push(MemessageBox);
      console.log(MemessageBox);
    });

    socket.on("exit chat", () =>{
      usersList = usersList.filter((user) => user !== socket.userName);
      socket.leave('chat', () => {
        io.to('chat').emit("get users", usersList);
        socket.broadcast.emit("user disconnected", socket.userName);
        console.log(`${socket.userName} disconnected on chat`)
      });
    })

    socket.on("disconnect", () => {
      numUserConnected--;
      usersList = usersList.filter((user) => user !== socket.userName);
      io.in("chat").emit("get users", usersList);

      socket.broadcast.emit("user disconnected", socket.userName);

      console.log(
        `user has disconnected to server, ${numUserConnected} users online`
      );
    });
  },
};
