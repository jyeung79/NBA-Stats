import React from 'react';
import BarChart from './graph/BarChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='App-body'>
        <BarChart
          width={500}
          height={400}
          // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        />
      </div>
    </div>
  );
}

export default App;
