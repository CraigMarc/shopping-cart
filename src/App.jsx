import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home'
import Shop from './Shop'
import Cart from './Cart'
import Checkout from './Checkout'
import ProductPage from './ProductPage'
import ErrorPage from './ErrorPage'
import Router from './Router'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

function App() {

  const [cartItems, setCartItems] = useState([])
  //if api goes down data in assets data
  const [apiItems, setApiItems] = useState()

return (
  <div>
    <Router
    cartItems={cartItems}
    setCartItems={setCartItems}
    apiItems={apiItems}
    setApiItems={setApiItems}
    />
  </div>
)
  
/*

  return (

    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" 
          element={<Home></Home>}
          errorElement={<ErrorPage />}
          >

          </Route>

          <Route
            path="/shop"
            element={
              <Shop apiItems={apiItems} 
              setApiItems={setApiItems} 
              cartItems={cartItems}
              />
            }
            errorElement={<ErrorPage />}
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            }
            errorElement={<ErrorPage />}
          ></Route>
          <Route
            path="/product"
            element={
              <ProductPage
                apiItems={apiItems} setApiItems={setApiItems}
                cartItems={cartItems} setCartItems={setCartItems}
              />
            }
            errorElement={<ErrorPage />}
         ></Route>
         <Route
            path="/checkout"
            element={
              <Checkout
                apiItems={apiItems} setApiItems={setApiItems}
                cartItems={cartItems} setCartItems={setCartItems}
              />
            }
            errorElement={<ErrorPage />}
         ></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
*/
}

export default App
