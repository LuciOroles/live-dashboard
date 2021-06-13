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
        let generatorConfig: Partial<Input> = {};

        try {
            generatorConfig = JSON.parse(message);
            console.log(generatorConfig);

            if (messageSender) {
                clearInterval(messageSender)
            }
            messageSender = setInterval(() => {
                counter.v++;
                const result = generator.next({ second: counter.v, ...generatorConfig });

                const data = {
                    parameter: result.value,
                    timeStamp: new Date().getTime(),
                };

                console.log(' sending ', data);
                ws.send(JSON.stringify(data));
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