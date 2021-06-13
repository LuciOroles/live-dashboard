import React, { useContext, useReducer } from 'react';

enum Actions {
  themeUpdate,
  graphUpdate,
}

type Action = { type: Actions.themeUpdate; payload: string };
type Dispatch = (action: Action) => void;
type State = {
  selectedTheme: string;
};

const dashboardReducer = (state: State, action: Action) => {
  switch (action.type) {
    case Actions.themeUpdate: {
      return { ...state, selectedTheme: action.payload };
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
