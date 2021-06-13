import React, { ChangeEvent, FormEvent } from 'react';

import './App.css';
import './i18nInstance';

import WebSocketDemo from './WebSocketDemo';
import DemoIntern from './DemoIntern';
import DemoChart from './DemoChart';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import themeDark from './themeDark';
import ThemePicker from './ThemePicker';

const onLabelChange = (e: ChangeEvent) => {
  console.log(Boolean(e.currentTarget.getAttribute('value')));
};

const themeList = [
  {
    label: 'Dark One',
    id: 'd1',
    checked: false,
  },
  {
    label: 'Light One',
    id: 'l1',
    checked: true,
  },
];

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={themeDark}>
        <ThemePicker onLabelChange={onLabelChange} themeList={themeList} />
        <header>Dashboard</header>
        <section>
          <div>
            <p>Dashboard goes here</p>
          </div>
          <WebSocketDemo />
          <DemoIntern />
          <DemoChart />
        </section>
      </ThemeProvider>
    </div>
  );
}

export default App;
