import React, { useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useWebsocketMessages from './useWebsocketMessages';

export default function WebSocketDemo() {
  const [inputData, setInputData] = useState<string>('');

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

  const updateController = (isStoped: boolean) => () => {
    sendMessage(JSON.stringify({ stop: isStoped }));
  };

  const connectToController = () => {
    sendMessage(JSON.stringify({ connect: true }));
  };

  const disconnectToController = () => {
    sendMessage(JSON.stringify({ disconnect: true }));
  };

  return (
    <div>
      <button
        onClick={connectToController}
        disabled={readyState !== ReadyState.OPEN}
      >
        Connect
      </button>
      <button type="button" onClick={updateController(true)}>
        Stop
      </button>
      <button type="button" onClick={updateController(false)}>
        Restart
      </button>
      <button type="button" onClick={disconnectToController}>
        Disconnect
      </button>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setInputData(e?.currentTarget.value);
          }}
        />
        <button type="button" onClick={updateFactor}>
          update factor
        </button>
      </div>
      <span>Connection with controller is currently: {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
    </div>
  );
}
