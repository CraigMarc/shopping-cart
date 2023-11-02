import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


let nameVar = "craig"

const TestApp = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
      
      
    </>
  );
};


export default TestApp