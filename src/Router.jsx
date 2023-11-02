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
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: < Cart/>,
      },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;