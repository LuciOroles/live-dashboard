"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const paramGenerator_1 = require("./src/paramGenerator");
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
    let outputMessage;
    ws.on('message', (message) => {
        console.log(' msg xx', message);
        if (message === 'stop')
            status.stop = true;
        if (message === 'start')
            status.stop = false;
        outputMessage = setInterval(() => {
            counter.v++;
            const result = generator.next({ second: counter.v, stop: status.stop });
            ws.send(`${result.value}`);
        }, 2000);
    });
    ws.on("close", () => {
        generator.next({ second: 0, stop: true });
        console.log(' ?close', outputMessage);
        if (outputMessage) {
            console.log(' clear close');
            clearInterval(outputMessage);
        }
    }); // check how to close the conncetion
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map