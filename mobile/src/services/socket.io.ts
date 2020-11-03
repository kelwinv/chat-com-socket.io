import socketIoClient from 'socket.io-client';

const ENDPOINT = "http://192.168.1.106:3333";

const socket = socketIoClient(ENDPOINT);

export { socket };