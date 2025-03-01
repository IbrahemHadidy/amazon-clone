import type { AppDispatch, RootState } from '@app/store';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  initializeAuth,
  setCurrentUserData,
  setIsAuthInitialized,
  setIsUserLoggedIn
} from './authSlice';

const authListener = createListenerMiddleware();
const listen = authListener.startListening.withTypes<RootState, AppDispatch>();

// 🔹 Listen for auth initialization
listen({
  actionCreator: initializeAuth,
  effect: (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const state = getState().auth;

    if (state.isAuthInitialized) return;

    try {
      const user = localStorage.getItem('user');

      if (user) {
        dispatch(setIsUserLoggedIn(true));
        dispatch(setCurrentUserData(JSON.parse(user)));
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
    }

    dispatch(setIsAuthInitialized(true));
  }
});

export default authListener;
