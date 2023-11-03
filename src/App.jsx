import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home'
import Shop from './Shop'
import Cart from './Cart'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

function App() {

  const [cartItems, setCartItems] = useState(['hello props'])

  /*
fetch('https://fakestoreapi.com/products?limit=10')
            .then(res=>res.json())
            .then(json=>console.log(json))*/
  /*
  const [data, setData] = useState()

  const fetchInfo = async (pics) => {
      //setLoading(true)
      if (pics == undefined) {
        pics = "mountains"
      }
      try {
        //return fetch(picUrl)
        const res = await fetch("https://fakestoreapi.com/products?limit=10")
  
        const productData = await res.json();
        setData(productData)
       
  
      }
  
      catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        //add error message to dom
        //setError("true")
        //setFindPicsState(true)
      }
  
    }
  
  
    useEffect(() => {
      fetchInfo();
    }, [])
 
    console.log(data)
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>

        <Route
          path="/shop"
          element={
            <Shop cartItems={cartItems} setCartItems={setCartItems} />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
          }
        ></Route>
      </Routes>
      </BrowserRouter>
      )  
            
}

      export default App
