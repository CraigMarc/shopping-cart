import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Shop from "./Shop"
import ErrorPage from "./ErrorPage";
import Cart from "./Cart"
import Checkout from './Checkout'
import ProductPage from './ProductPage'

const Router = (props) => {

  const {

    apiItems,
    setApiItems,
    cartItems,
    setCartItems

  } = props;

  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/shop",
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
        < Checkout
        cartItems={cartItems}
        setCartItems={setCartItems}
        />,
        errorElement: <ErrorPage />,
      },

  ]);

  return <RouterProvider router={router} />;
};

export default Router;