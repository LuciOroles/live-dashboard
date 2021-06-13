import React from 'react';

import './App.css';
import './i18nInstance';

import WebSocketDemo from './WebSocketDemo';
import DemoIntern from './DemoIntern';

function App() {
  return (
    <div className="App">
      <header>Dashboard</header>
      <section>
        <div>
          <p>Dashboard goes here</p>
        </div>
        <WebSocketDemo />
        <DemoIntern />
      </section>
    </div>
  );
}

export default App;
