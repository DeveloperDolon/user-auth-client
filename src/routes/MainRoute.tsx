import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/singin/Signin";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthGuard from "../components/AuthGuard";
import Home from "../pages/home/Home";

const routes = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <Home/>, 
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard/",
        element: (
          <AuthGuard>
            <div>Dashboard Home</div>
          </AuthGuard>
        ),
      },
    ],
  },
]);

export default routes;
