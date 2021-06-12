"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const paramGenerator_1 = require("./paramGenerator");
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});
wss.on('connection', (ws) => {
    const counter = {
        v: 0,
    };
    const generator = paramGenerator_1.default();
    const status = {
        stop: false,
    };
    ws.on('message', (message) => {
        console.log(' msg xx', message);
        if (message === 'stop')
            status.stop = true;
        const sender = setInterval(() => {
            counter.v++;
            const result = generator.next({ second: counter.v, stop: status.stop });
            if (counter.v === 130)
                clearInterval(sender);
            ws.send(`${result.value}`);
        }, 1000);
    });
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map