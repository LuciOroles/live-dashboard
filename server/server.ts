import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import paramGenerator from './paramGenerator';

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const wss = new WebSocket.Server({
    server
});

wss.on('connection', (ws: WebSocket) => {
    const counter = {
        v: 0,
    };
    const generator = paramGenerator();
    const status = {
        stop: false,
    };
    let outputMessage: ReturnType<typeof setInterval>;


    ws.on('message', (message: string) => {
        console.log(' msg xx', message);
        if (message === 'stop') status.stop = true;
        if (message === 'start') status.stop = false;

        outputMessage = setInterval(() => {
            counter.v++;
            const result = generator.next({ second: counter.v, stop: status.stop })

            ws.send(`${result.value}`);
        }, 1000);
    });

    ws.on("close", () => {
        generator.next({ second: 0, stop: true });
        if (Number.isFinite(outputMessage)) {
            clearInterval(outputMessage)
        }
    });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));