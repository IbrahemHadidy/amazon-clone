// Redux
import { configureStore } from '@reduxjs/toolkit';

// Slices
import authSlice from '@features/auth/authSlice';
import cartSlice from '@features/cart/cartSlice';
import searchSlice from '@features/search/searchSlice';
import wishlistSlice from '@features/wishlist/wishlistSlice';

// Listeners
import authListener from '@features/auth/authListener';
import cartListener from '@features/cart/cartListener';
import searchListener from '@features/search/searchListener';
import wishlistListener from '@features/wishlist/wishlistListener';

// Types
import type { ThunkAction, Action } from '@reduxjs/toolkit';

//--------------------------- Store Configuration --------------------------//
const store = configureStore({
  reducer: {
    // Slices
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      // Listeners
      authListener.middleware,
      searchListener.middleware,
      cartListener.middleware,
      wishlistListener.middleware
    )
});

//--------------------------- Store Export ---------------------------------//
const makeStore = () => store;
export default makeStore;

//--------------------------- Store Types ----------------------------------//
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
