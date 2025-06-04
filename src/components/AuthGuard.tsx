import { type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { TokenManager } from "../utils/tokenManager";
import { useSubdomain } from "../hooks/useSubdomain";
import {
  verifySuccess,
  verifyFailure,
  verifyStart,
} from "../stores/features/authSlice";
import { useVerifyTokenMutation } from "../stores/api/auth";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAuthenticated, verifying } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth
  );
  const { isSubdomain } = useSubdomain();
  const [verifyToken] = useVerifyTokenMutation();

  const verifyAuth = async () => {
    const token = TokenManager.getToken();

    if (token && !isAuthenticated && !verifying) {
      dispatch(verifyStart());

      try {
        const result = await verifyToken(token).unwrap();
        console.log(result);
        if (result.success) {
          dispatch(verifySuccess(result.data));
        } else {
          dispatch(verifyFailure());
        }
      } catch {
        dispatch(verifyFailure());
      }
    }
  };

  verifyAuth();

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Is authenticated" + isAuthenticated);
    if (isSubdomain) {
      window.location.href = `${import.meta.env.VITE_WEBSITE_URL}:${import.meta.env.VITE_PORT}/signin?redirect=${encodeURIComponent(
        window.location.href
      )}`;
      return null;
    }

    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
