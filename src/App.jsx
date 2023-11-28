import { useEffect, useState } from 'react'
import Allroutes from './Allroutes';
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  
  useEffect(()=>{
    AOS.init();
  },[]);
  return (
    <div className="App Container-main-div">
      <wc-toast theme="light"></wc-toast>
      <Allroutes />
    </div>
  );
}

export default App
