import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/singin/Signin";

const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />
  }
]);

export default routes;
