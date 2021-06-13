import React, { useState, useCallback, useRef, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function WebSocketDemo() {
  const messageHistory = useRef<string[]>([]);
  const [inputData, setInputData] = useState<string>('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:5000'
  );
  useEffect(() => {
    messageHistory.current = [];
  }, []);

  useEffect(() => {
    const lastIndex = messageHistory.current.length - 1;
    if (lastMessage) {
      if (
        messageHistory.current[lastIndex] !== lastMessage.data ||
        lastMessage.data === '0'
      ) {
        messageHistory.current = [...messageHistory.current, lastMessage.data];
      }
    }
  }, [lastMessage]);

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

  const stopController = () => {
    sendMessage(JSON.stringify({ stop: true }));
  };

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Send Data
      </button>
      <button type="button" onClick={stopController}>
        Stop
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
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.current.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </ul>
    </div>
  );
}
