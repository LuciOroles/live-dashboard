import React from 'react';

import './App.css';
import './i18nInstance';

import WebSocketDemo from './WebSocketDemo';
import DemoIntern from './DemoIntern';
import DemoChart from './DemoChart';

import DashboardTheme from './Theme/DashboardTheme';
import { DashboardProvider } from './Context';
import ThemeUpdater from './Theme/ThemeUpdater';

function App() {
  return (
    <DashboardProvider>
      <DashboardTheme>
        <div className="App">
          <header>Dashboard</header>
          <section>
            <ThemeUpdater />
          </section>
          <section>
            <div>
              <p>Dashboard goes here</p>
            </div>
            <WebSocketDemo />
            <DemoIntern />
            <DemoChart />
          </section>
        </div>
      </DashboardTheme>
    </DashboardProvider>
  );
}

export default App;
