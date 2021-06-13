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
    let connectionState = false;

    const communicate = (nextValue: Input) => {

        return setInterval(() => {
            counter.v++;
            const result = generator.next({ ...nextValue, second: counter.v });
            const data = {
                parameter: result.value,
                timeStamp: new Date().getTime(),
            };
            ws.send(JSON.stringify(data));
        }, 2000);
    }


    ws.on('message', (message: string) => {
        let generatorConfig: Partial<Input> = {};

        try {
            generatorConfig = JSON.parse(message);

            const configKeys = new Set(Object.keys(generatorConfig));
            if (configKeys.has('connect') || configKeys.has('disconnect') || configKeys.has('stop') || configKeys.has('factor')) {

                if (messageSender) {
                    clearInterval(messageSender);
                }
            }

            if (connectionState && generatorConfig.factor) {
                const next: Input = {
                    second: counter.v,
                }
                if (typeof generatorConfig.factor === 'string') {
                    next.factor = parseFloat(generatorConfig.factor)
                }
                messageSender = communicate(next);
            }

            if (generatorConfig.connect || generatorConfig.stop === false) {
                counter.v = 1;
                connectionState = true;
                messageSender = communicate({ second: counter.v })
            }

            if (generatorConfig.disconnect) {
                connectionState = false;
                ws.close();
            }

            if (generatorConfig.stop) {
                connectionState = false;
                messageSender = messageSender = communicate({ second: counter.v, stop: true });
            }


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