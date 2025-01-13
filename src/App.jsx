import { useState, useRef } from 'react'
import Router from './Router'
import './App.css'
import fileJson from './assets/data/data2.json';
import { usePersistState } from './usePersistState';

function App() {

  //const [cartItems, setCartItems] = useState([])
  const [cartItems, setCartItems] = usePersistState([], 'cartItems');
  //if api goes down data in assets data use the following setstate
  //const [apiItems, setApiItems] = useState(fileJson.products)
  //const [apiItems, setApiItems] = useState()
  const [apiItems, setApiItems] = usePersistState("", 'apiItems');
  //const [cartState, setCartState] = useState()
  const [cartState, setCartState] = usePersistState("", 'cartState');
  //const [order, setOrder] = useState()
  const [order, setOrder] = usePersistState("", 'order');
  // const [category, setCategory] = useState()
  const [category, setCategory] = usePersistState("", 'category');
  //const [brand, setBrand] = useState()
  const [brand, setBrand] = usePersistState("", 'brand');
  const oosRef = useRef();


  //send props to router so routes have them available

  return (
    <div>
      <Router
        cartItems={cartItems}
        setCartItems={setCartItems}
        apiItems={apiItems}
        setApiItems={setApiItems}
        cartState={cartState}
        setCartState={setCartState}
        order={order}
        setOrder={setOrder}
        oosRef={oosRef}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}

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
