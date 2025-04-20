import React from 'react';
// Import Components by area
import LeftArea from './Left-Bar/Left-Bar';
import TopArea from './Top-bar/Top-Bar';
import MainArea from './Main-Area/Main-Area';
// Import Styles
import './App.css';

function App() {


  return (
    <div id='OneToContainThemAll'>
      <TopArea />
      <div id='OneToContainBoth'>
       <LeftArea />
       <MainArea />
      </div>
    </div>
  );
}

export default App;
