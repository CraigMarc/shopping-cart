import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop"
import ErrorPage from "./ErrorPage";
import Cart from "./Cart"
import Checkout from './Checkout'
import ProductPage from './ProductPage'
import Success from './Success'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';





const Router = (props) => {

const stripePromise = loadStripe('pk_test_51Q0OsODmVJRVlYWkkRMV6XZ4NcD9VOVBEdsCb0ypBuBtQN4NL7bDDZFJETo7JwD7XA2uYNbTVqkk3A3Z115I1zaY00RVrJ1opv');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd'
 
};

  const {

    apiItems,
    setApiItems,
    cartItems,
    setCartItems,
   

  } = props;

  const router = createBrowserRouter([
    /*
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },*/
    {
        path: "/",
        element:
          <Shop 
          apiItems={apiItems} 
          setApiItems={setApiItems} 
          cartItems={cartItems}
          />,
        
        errorElement: <ErrorPage />,
      },
      {
        path: "/cart",
        element: 
        < Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/product",
        element: 
        < ProductPage
        cartItems={cartItems}
        setCartItems={setCartItems}
        apiItems={apiItems} 
        setApiItems={setApiItems}
        />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/checkout",
        element: 
        <Elements stripe={stripePromise} options={options}>
        <Checkout
        cartItems={cartItems}
        setCartItems={setCartItems}
        />
        </Elements>,
    
        errorElement: <ErrorPage />,
      },
     

      {
        path: "/success",
        element: 
        < Success
        cartItems={cartItems}
        setCartItems={setCartItems}
        />,
        errorElement: <ErrorPage />,
      },

  ]);

  return <RouterProvider router={router} />;
};

export default Router;