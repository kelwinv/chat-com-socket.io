"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../server");
var numUserConnected = 0;
var usersList = [];
var messageId = 0;
var messageString = 0;
var MessageSpawn = false;
var mensagensBoxList = [];
function joinInChat(socket) {
    server_1.io.in("chat").emit("get users", usersList);
    socket.emit("get messagens", mensagensBoxList);
    console.log(socket.userName + " has connected on chat");
}
function handleMessageSpawn() {
    setInterval(function () {
        messageString = 0;
        MessageSpawn = false;
    }, 4000);
    if (messageString >= 3) {
        MessageSpawn = true;
    }
}
exports.default = {
    connetion: function (socket) {
        numUserConnected++;
        console.log(numUserConnected + " users online");
        socket.on("add user", function (userName) {
            if (usersList.find(function (user) { return user === userName; })) {
                socket.emit("auth fail", true);
                return;
            }
            socket.emit("login", { isAuth: true, userName: userName });
            socket.join("chat");
            socket.userName = userName;
            usersList.push(userName);
            socket.broadcast.emit("user joined", userName);
            joinInChat(socket);
        });
        socket.on("send message", function (_a) {
            var author = _a.author, message = _a.message;
            if (MessageSpawn)
                return;
            var MemessageBox = { author: author, message: message, id: messageId };
            messageString++;
            handleMessageSpawn();
            messageId++;
            server_1.io.in("chat").emit("new message", MemessageBox);
            mensagensBoxList.push(MemessageBox);
            console.log(MemessageBox);
        });
        socket.on("exit chat", function () {
            usersList = usersList.filter(function (user) { return user !== socket.userName; });
            socket.leave('chat', function () {
                server_1.io.to('chat').emit("get users", usersList);
                socket.broadcast.emit("user disconnected", socket.userName);
                console.log(socket.userName + " disconnected on chat");
            });
        });
        socket.on("disconnect", function () {
            numUserConnected--;
            usersList = usersList.filter(function (user) { return user !== socket.userName; });
            server_1.io.in("chat").emit("get users", usersList);
            socket.broadcast.emit("user disconnected", socket.userName);
            console.log("user has disconnected to server, " + numUserConnected + " users online");
        });
    },
};
