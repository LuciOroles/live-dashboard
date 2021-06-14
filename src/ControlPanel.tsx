import React, { useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useWebsocketMessages from './useWebsocketMessages';
import { Button } from 'theme-ui';

export default function ControlPanel() {
  const [inputData, setInputData] = useState<string>('');
  const [getsData, setGetsData] = useState<boolean>(false);
  const [stoped, setStoped] = useState<boolean>(false);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:5000'
  );

  useWebsocketMessages(lastMessage);

  const updateFactor = useCallback(
    () => sendMessage(JSON.stringify({ factor: inputData })),
    [inputData, sendMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const updateController = (toStop: boolean) => () => {
    setStoped(toStop);
    sendMessage(JSON.stringify({ stop: toStop }));
  };

  const connectionClosed = ReadyState.CLOSED === readyState;

  const handleConnect = () => {
    sendMessage(JSON.stringify({ connect: true }));
    setGetsData(true);
  };

  const handleDisconnect = () => {
    setGetsData(false);
    sendMessage(JSON.stringify({ disconnect: true }));
  };

  console.log(' readyState', readyState, connectionStatus);
  const margins = { margin: '0.2em' };

  return (
    <div>
      <div className="ctrlBtn">
        {(!getsData || connectionClosed) && (
          <Button onClick={handleConnect} className="panelBtn" sx={margins}>
            Connect
          </Button>
        )}
        {getsData && (
          <Button sx={margins} onClick={handleDisconnect}>
            Disconnect
          </Button>
        )}
      </div>
      <div className="ctrlBtn">
        {getsData && !stoped && (
          <Button type="button" onClick={updateController(true)} sx={margins}>
            Stop
          </Button>
        )}
        {stoped && (
          <Button type="button" onClick={updateController(false)} sx={margins}>
            Restart
          </Button>
        )}
      </div>
      {getsData && (
        <div className="ctrlBtn">
          <input
            type="range"
            max="0.99"
            min="0.51"
            step="0.01"
            value={inputData}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setInputData(e?.currentTarget.value);
            }}
            className="updateFactor"
          />
          <Button type="button" onClick={updateFactor}>
            Update Factor
          </Button>
        </div>
      )}
    </div>
  );
}
