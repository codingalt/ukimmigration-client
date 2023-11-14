import { useEffect, useState } from 'react'
import Allroutes from './Allroutes';
import "./App.css";

function App() {

  

  return (
    <div className="App Container-main-div">
      <wc-toast theme="light"></wc-toast>
      <Allroutes />
    </div>
  );
}

export default App
