import React from 'react';

import './App.css';
import './i18nInstance';

import WebSocketDemo from './WebSocketDemo';
import DemoIntern from './DemoIntern';
import ChartUpdater from './Chart/ChartUpdater';

import DashboardTheme from './Theme/DashboardTheme';
import { DashboardProvider } from './Context';
import ThemeUpdater from './Theme/ThemeUpdater';
import Board from './UI/Board';

function App() {
  return (
    <DashboardProvider>
      <DashboardTheme>
        <div className="App">
          <header>Dashboard</header>
          <Board
            left={<ChartUpdater />}
            right={
              <React.Fragment>
                <ThemeUpdater />
                <WebSocketDemo />
              </React.Fragment>
            }
          />

          <section>
            <DemoIntern />
          </section>
        </div>
      </DashboardTheme>
    </DashboardProvider>
  );
}

export default App;
