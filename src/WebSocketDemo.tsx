import React, { useState, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useWebsocketMessages from './useWebsocketMessages';

export default function WebSocketDemo() {
  const [inputData, setInputData] = useState<string>('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:5000'
  );

  useWebsocketMessages(lastMessage);

  const handleClickSendMessage = useCallback(
    () => sendMessage(JSON.stringify(inputData)),
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

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Get Data
      </button>
      <button type="button" onClick={updateController(true)}>
        Stop
      </button>
      <button type="button" onClick={updateController(false)}>
        Restart
      </button>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setInputData(e?.currentTarget.value);
          }}
        />
      </div>
      <span>Connection with controller is currently: {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
    </div>
  );
}
