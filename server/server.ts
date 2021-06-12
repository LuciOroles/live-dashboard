import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Input } from './src/getParameter';
import paramGenerator from './src/paramGenerator';

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const wss = new WebSocket.Server({
    server
});

wss.on('connection', (ws: WebSocket) => {
    const counter = {
        v: 1,
    };
    const generator = paramGenerator();
    generator.next({ second: counter.v });
    let messageSender: ReturnType<typeof setInterval>;


    ws.on('message', (message: string) => {
        console.log(' msg xx', message);
        let geneneratorConfig: Partial<Input> = {};

        try {
            geneneratorConfig = JSON.parse(message) as Partial<Input>
            messageSender = setInterval(() => {
                counter.v++;
                const result = generator.next({ second: counter.v, ...geneneratorConfig })
                ws.send(`${result.value}`);
            }, 2000);
        } catch (error) {
            console.error(error);
            ws.send('unable to parse');
        }


    });

    ws.on("close", () => {
        generator.next({ second: 0, stop: true });
        if (messageSender) {
            clearInterval(messageSender);

        }
    });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));