import React from 'react';
import BarChart from './graph/BarChart';
import Searchbar from './searchbar/Searchbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='App-body'>
        <Searchbar />
        <BarChart
          width={800}
          height={600}
          // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        />
        
      </div>
    </div>
  );
}

export default App;
