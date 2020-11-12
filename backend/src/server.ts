import exprees from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

import router from './routes';

import socketController from './Controllers/socketController';

const port = process.env.PORT || 3333;
const app = exprees();
const server = http.createServer(app);
export const io = socketIo(server);

app.use(cors())
app.use(router);

io.on("connection", socketController.connetion);

server.listen(port,() => {
  console.log(`Listening on port: ${port}`);
});