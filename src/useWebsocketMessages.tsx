import { useEffect } from 'react';
import { Actions, useDashboardContext } from './Context';

type MessageData = {
  parameter: string;
  timeStamp: number;
};

type GraphData = {
  parametr: string;
  time: {
    hour: number;
    minute: number;
    secound: number;
  };
};

const useWebsocketMessages = (lastMessage: MessageEvent<any> | null) => {
  const { dispatch } = useDashboardContext();

  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedEntry = JSON.parse(lastMessage.data) as MessageData;
        const d = new Date(parsedEntry.timeStamp);
        const entry: GraphData = {
          parametr: parsedEntry.parameter,
          time: {
            hour: d.getHours(),
            minute: d.getMinutes(),
            secound: d.getSeconds(),
          },
        };
        dispatch({
          type: Actions.graphUpdate,
          payload: {
            label: `${entry.time.minute}:${entry.time.secound}`,
            data: Number(parsedEntry.parameter),
          },
        });
      } catch (error) {
        console.log(`the message is not in the expected format, ${error}`);
      }
    }
  }, [dispatch, lastMessage]);
};

export default useWebsocketMessages;
