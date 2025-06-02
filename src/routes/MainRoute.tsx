import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup";

const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default routes;
