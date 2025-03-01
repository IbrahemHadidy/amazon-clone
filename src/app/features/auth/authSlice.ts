// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { login, logout, register, updateUserData } from './authThunks';

// Types
import type User from '@interfaces/user';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthInitialized: boolean;
  isUserLoggedIn: boolean;
  currentUserData: User | null;
}

// Initial state
const authState: AuthState = {
  isAuthInitialized: false,
  isUserLoggedIn: false,
  currentUserData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,

  reducers: {
    setIsAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAuthInitialized = action.payload;
    },
    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    setCurrentUserData: (state, action: PayloadAction<User | null>) => {
      state.currentUserData = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isUserLoggedIn = true;
        action.payload && (state.currentUserData = action.payload);
      })
      .addCase(register.rejected, (state) => {
        state.isUserLoggedIn = false;
        state.currentUserData = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isUserLoggedIn = true;
        action.payload && (state.currentUserData = action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.isUserLoggedIn = false;
        state.currentUserData = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isUserLoggedIn = false;
        state.currentUserData = null;
      })

      .addCase(updateUserData.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
      });
  }
});

// Action listeners
export const initializeAuth = createAction('auth/initialize');

export const { setIsAuthInitialized, setIsUserLoggedIn, setCurrentUserData } =
  authSlice.actions;
export default authSlice;
