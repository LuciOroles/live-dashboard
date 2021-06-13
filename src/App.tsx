import React from 'react';
import './i18nInstance';

import DashboardTheme from './Theme/DashboardTheme';
import { DashboardProvider } from './Context';
import Wrapper from './Wrapper/Wrapper';
import ThemeUpdater from './Theme/ThemeUpdater';
function App() {
  return (
    <DashboardProvider>
      <DashboardTheme>
        <ThemeUpdater />
        <Wrapper />
      </DashboardTheme>
    </DashboardProvider>
  );
}

export default App;
