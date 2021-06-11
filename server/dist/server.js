"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(' msg ', message);
        ws.send(`Sending back ${message}`);
    });
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map