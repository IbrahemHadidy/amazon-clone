import { createListenerMiddleware } from '@reduxjs/toolkit';
import products from '@services/products';
import { toast } from 'react-toastify';
import { initializeWishlist, setWishlistItems } from './wishlistSlice';

import type { AppDispatch, RootState } from '@app/store';

const wishlistListener = createListenerMiddleware();
const listen = wishlistListener.startListening.withTypes<
  RootState,
  AppDispatch
>();

// Listen for search initialization
listen({
  actionCreator: initializeWishlist,

  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isWishlistInitialized } = getState().wishlist;
    const { currentUserData } = getState().auth;

    if (isWishlistInitialized) return;
    if (!currentUserData?.wishlist?.length) return;

    await toast.promise(
      (async () => {
        try {
          const wishlistItems = await Promise.all(
            currentUserData.wishlist.map((id) => products.getOne(id))
          );

          dispatch(setWishlistItems(wishlistItems));
        } catch (error) {
          console.error('Failed to fetch wishlist items:', error);
          throw error;
        }
      })(),
      {
        pending: 'Loading wishlist items...',
        success: 'Wishlist items loaded!',
        error: 'Failed to fetch wishlist items.'
      }
    );
  }
});

export default wishlistListener;
