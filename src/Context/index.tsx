import React, { useContext, useReducer } from 'react';

enum Actions {
  themeUpdate,
  graphUpdate,
  updateSessions,
}

type Action =
  | { type: Actions.themeUpdate; payload: string }
  | {
      type: Actions.graphUpdate;
      payload: {
        label: string;
        data: number;
      };
    };
type Dispatch = (action: Action) => void;
type GraphData = {
  data: number[];
};

type State = {
  selectedTheme: string;
  graph: {
    labels: string[];
    data: number[];
  };
  sessions: Map<string, GraphData>;
  sessionsLabels: string[];
};

const createLabel = (total: number) => {
  const newLabel = new Array(total);
  for (let i = 0; i < total; i++) {
    newLabel[i] = (i + 1).toString();
  }
  return newLabel;
};

const dashboardReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.themeUpdate: {
      return { ...state, selectedTheme: action.payload };
    }
    case Actions.graphUpdate: {
      const { sessions, graph } = state;

      if (graph.data.length === 25) {
        return {
          ...state,
          graph: {
            labels: [],
            data: [],
          },
          sessions: sessions.set(`session - ${sessions.size}`, {
            data: graph.data,
          }),
          sessionsLabels: createLabel(25),
        };
      }
      return {
        ...state,
        graph: {
          labels: [...state.graph.labels, action.payload.label],
          data: [...state.graph.data, action.payload.data],
        },
      };
    }

    default:
      throw new Error(`unhandled action, ${action}`);
  }
};

const DashboardContext =
  React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
    undefined
  );

const DashboardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    selectedTheme: 'l1',
    graph: {
      labels: [],
      data: [],
    },
    sessions: new Map(),
    sessionsLabels: [],
  });

  const value = {
    state,
    dispatch,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('unable to connect');
  }

  return context;
};

export { useDashboardContext, DashboardProvider, Actions };
