// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type Product from '@interfaces/product';

interface WishlistState {
  isWishlistInitialized: boolean;
  wishlistItems: Product[];
  selectedItems: number[];
}

// Initial state
const wishlistState: WishlistState = {
  isWishlistInitialized: false,
  wishlistItems: [],
  selectedItems: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: wishlistState,

  reducers: {
    setIsWishlistInitialized: (state, action: PayloadAction<boolean>) => {
      state.isWishlistInitialized = action.payload;
    },
    setWishlistItems: (state, action: PayloadAction<Product[]>) => {
      state.wishlistItems = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<number[]>) => {
      state.selectedItems = action.payload;
    },
    selectItem: (state, action: PayloadAction<number>) => {
      state.selectedItems.push(action.payload);
    },
    deselectItem: (state, action: PayloadAction<number>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item !== action.payload
      );
    },

    resetWishlist: () => wishlistState
  }
});

// Listener actions
export const initializeWishlist = createAction('wishlist/initialize');

export const {
  setIsWishlistInitialized,
  setWishlistItems,
  setSelectedItems,
  selectItem,
  deselectItem,
  resetWishlist
} = wishlistSlice.actions;
export default wishlistSlice;
