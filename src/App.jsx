import { useState } from 'react'
import Router from './Router'
import './App.css'


function App() {

  const [cartItems, setCartItems] = useState([])
  //if api goes down data in assets data
  const [apiItems, setApiItems] = useState()

//send props to router so routes have them available

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
