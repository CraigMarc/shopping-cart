import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Shop from "./components/shopComponents/Shop"
import ErrorPage from "./components/errorPageComponents/ErrorPage";
import Cart from "./components/cartComponents/Cart"
import Checkout from './components/checkoutComponents/Checkout'
import ProductPage from './components/productPageComponents/ProductPage'
import Summary from './components/summaryComponents/Summary'
import Success from './components/successComponents/Success'
import Address from './components/addressComponents/Address'
import OutOfStock from './components/OutOfStocKComponents/OutOfStock'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';





const Router = (props) => {

  const stripePromise = loadStripe('pk_test_51Q0OsODmVJRVlYWkkRMV6XZ4NcD9VOVBEdsCb0ypBuBtQN4NL7bDDZFJETo7JwD7XA2uYNbTVqkk3A3Z115I1zaY00RVrJ1opv');



  const {

    apiItems,
    setApiItems,
    cartItems,
    setCartItems,
    cartState,
    setCartState,
    order,
    setOrder,
    oosRef,
   

  } = props;


  const options = {
    mode: 'payment',
    amount: cartState * 100,
    currency: 'usd'

  };



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
          cartState={cartState}
          setCartState={setCartState}
          apiItems={apiItems}
          
         
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
            order={order}
            cartItems={cartItems}
            setCartItems={setCartItems}
            cartState={cartState}
            oosRef={oosRef}
            setApiItems={setApiItems}
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
          order={order}
        />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/address",
      element:
        < Address
          order={order}
          setOrder={setOrder}
          cartState={cartState}
          cartItems={cartItems}
        />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/summary",
      element:
        < Summary
          order={order}
          setOrder={setOrder}
          cartState={cartState}
          cartItems={cartItems}
        />,
      errorElement: <ErrorPage />,
    },

    {
      path: "/oos",
      element:
        < OutOfStock
          oosRef={oosRef}
          order={order}
        />,
      errorElement: <ErrorPage />,
    },



  ]);

  return <RouterProvider router={router} />;
};

export default Router;