import React from 'react';

import './App.css';
import WebSocketDemo from './WebSocketDemo';

function App() {
  return (
    <div className="App">
      <header>Dashboard</header>
      <section>
        <div>
          <p>Dashboard goes here</p>
        </div>
        <WebSocketDemo />
      </section>
    </div>
  );
}

export default App;
