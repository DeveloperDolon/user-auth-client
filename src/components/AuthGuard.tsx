import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useLazyVerifyTokenQuery } from '../stores/api/auth';
import { TokenManager } from "../utils/tokenManager";
import { useSubdomain } from "../hooks/useSubdomain";
import { verifySuccess, verifyFailure, verifyStart } from "../stores/features/authSlice";

const AuthGuard = ({ children }: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAuthenticated, verifying, user } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth
  );
  const { isSubdomain } = useSubdomain();
  const [verifyToken] = useLazyVerifyTokenQuery();

  useEffect(() => {
    const token = TokenManager.getToken();

    if (token && !isAuthenticated && !verifying) {
      dispatch(verifyStart());

      verifyToken(token)
        .unwrap()
        .then((result) => {
          if (result.payload) {
            dispatch(verifySuccess(result.payload));
          } else {
            dispatch(verifyFailure());
          }
        })
        .catch(() => {
          dispatch(verifyFailure());
        });
    }
  }, [dispatch, verifyToken, isAuthenticated, verifying]);

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
    if (isSubdomain) {
      window.location.href = `http://localhost:5173/signin?redirect=${encodeURIComponent(
        window.location.href
      )}`;
      return null;
    }

    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
