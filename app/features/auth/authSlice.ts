import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  users: User[];
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};

const initialState: AuthState = {
  users: [],
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      const exists = state.users.find((u) => u.email === action.payload.email);

      if (!exists) {
        state.users.push(action.payload);
        state.error = null;
      } else {
        state.error = "Email already registered";
      }
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const found = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (found) {
        state.user = found;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = "Invalid credentials";
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
