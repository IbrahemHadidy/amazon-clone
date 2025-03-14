// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Types
import type Product from '@interfaces/product';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProductWithQuantity extends Product {
  quantity?: number;
}

interface CartState {
  isCartInitialized: boolean;
  cartItems: ProductWithQuantity[];
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
    setCartItems: (state, action: PayloadAction<ProductWithQuantity[]>) => {
      state.cartItems = action.payload;
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
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
  updateItemQuantity,
  setSelectedItems,
  selectItem,
  deselectItem,
  resetCart
} = cartSlice.actions;
export default cartSlice;
