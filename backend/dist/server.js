"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var socketController_1 = __importDefault(require("./Controllers/socketController"));
var port = process.env.PORT || 3333;
var app = express_1.default();
var server = http_1.default.createServer(app);
exports.io = socket_io_1.default(server);
app.use(cors_1.default());
app.use(routes_1.default);
exports.io.on("connection", socketController_1.default.connetion);
server.listen(port, function () {
    console.log("Listening on port: " + port);
});
