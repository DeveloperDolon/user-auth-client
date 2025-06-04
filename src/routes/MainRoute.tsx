import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/singin/Signin";
import DashboardLayout from "../layouts/DashboardLayout";

const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <div>Dashboard Home</div>
      }
    ]
  }
]);

export default routes;
