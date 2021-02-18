import React from 'react'
import { useState } from 'react'


export default function useVisualMode(initial) {


  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) =>{
    if(replace) {

    setMode(newMode)
    } else {
    setMode(newMode)

    setHistory([...history, newMode])
    }
  }

  const back = () =>{

    if (history.length <= 1) {
      setMode(initial);
    } else {
    const newHistory = [...history.slice(0, -1)];

    setHistory(newHistory);

    setMode(newHistory[newHistory.length -1]);
    }
  }

  return {  mode, transition, back };
}