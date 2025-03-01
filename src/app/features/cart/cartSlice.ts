// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type Product from '@interfaces/product';

interface CartState {
  isCartInitialized: boolean;
  cartItems: Product[];
  selectedItems: number[];
}

// Initial state
const cartState: CartState = {
  isCartInitialized: false,
  cartItems: [],
  selectedItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartState,

  reducers: {
    setIsCartInitialized: (state, action: PayloadAction<boolean>) => {
      state.isCartInitialized = action.payload;
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.cartItems = action.payload;
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

    resetCart: () => cartState
  }
});

// Listener actions
export const initializeCart = createAction('cart/initialize');

export const {
  setIsCartInitialized,
  setCartItems,
  setSelectedItems,
  selectItem,
  deselectItem,
  resetCart
} = cartSlice.actions;
export default cartSlice;
