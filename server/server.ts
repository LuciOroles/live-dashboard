import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const wss = new WebSocket.Server({
    server
});

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log(' msg ', message);
        ws.send(`Sending back ${message}`);
    });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));