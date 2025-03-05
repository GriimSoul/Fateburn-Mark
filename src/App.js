import React from 'react';
// Import Components by area
import LeftArea from './Left-Bar/Left-Bar';
import TopArea from './Top-bar/Top-Bar';
import MainArea from './Main-Area/Main-Area';
// Import Styles
import styles from './App.css';

function App() {
  return (
    <div className={styles.Background}>
      <TopArea />
      <LeftArea />
      <MainArea />
    </div>
  );
}

export default App;
