import { createListenerMiddleware } from '@reduxjs/toolkit';
import products from '@services/products';
import { toast } from 'react-toastify';
import { initializeCart, setCartItems } from './cartSlice';

import type { AppDispatch, RootState } from '@app/store';

const cartListener = createListenerMiddleware();
const listen = cartListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for search initialization
listen({
  actionCreator: initializeCart,

  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isCartInitialized } = getState().cart;
    const { currentUserData } = getState().auth;

    if (isCartInitialized) return;
    if (!currentUserData?.cart?.length) return;

    await toast.promise(
      (async () => {
        try {
          const cartItems = await Promise.all(
            currentUserData.cart.map((id) => products.getOne(id))
          );

          dispatch(setCartItems(cartItems));
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
          throw error;
        }
      })(),
      {
        pending: 'Loading cart items...',
        success: 'Cart items loaded!',
        error: 'Failed to fetch cart items.'
      }
    );
  }
});

export default cartListener;
