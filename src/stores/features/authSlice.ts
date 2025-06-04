import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TokenManager } from "../../utils/tokenManager";

interface User {
  id: string;
  username: string;
  shopNames: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  verifying: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: TokenManager.getToken(),
  isAuthenticated: false,
  loading: false,
  verifying: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      TokenManager.setToken(action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    verifyStart: (state) => {
      state.verifying = true;
    },
    verifySuccess: (state, action: PayloadAction<User>) => {
        console.log(action)
      state.verifying = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    verifyFailure: (state) => {
      state.verifying = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      TokenManager.removeToken();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      TokenManager.removeToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  verifyStart,
  verifySuccess,
  verifyFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
