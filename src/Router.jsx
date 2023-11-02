import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Shop from "./Shop"
import ErrorPage from "./ErrorPage";
import Cart from "./Cart"

const Router = () => {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
        path: "/shop",
        element: <Shop />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/cart",
        element: < Cart/>,
        errorElement: <ErrorPage />,
      },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;