import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/singin/Signin";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthGuard from "../components/AuthGuard";

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
