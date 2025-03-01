import { createAppAsyncThunk } from '@app/hooks';
import { updateUserData } from '@features/auth/authThunks';
import user from '@services/user';
import { toast } from 'react-toastify';

export const addToWishlist = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
    itemIds: number[];
  }
>(
  'wishlist/addToWishlist',
  (
    { userId, itemIds },
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    const { currentUserData } = getState().auth;

    const wishlistItems = currentUserData?.wishlist.filter((id) =>
      itemIds.includes(id)
    );

    if (
      wishlistItems &&
      wishlistItems.some((id) => currentUserData?.cart.includes(id))
    ) {
      const duplicateIds = wishlistItems.filter((id) =>
        currentUserData?.cart.includes(id)
      );
      toast.error(`Item(s) already in wishlist: ${duplicateIds.join(', ')}`);
      return rejectWithValue(
        `Item(s) already in wishlist: ${duplicateIds.join(', ')}`
      );
    }

    const cartItems = currentUserData?.cart.filter((id) =>
      itemIds.includes(id)
    );

    if (
      cartItems &&
      cartItems.some((id) => currentUserData?.wishlist.includes(id))
    ) {
      const duplicateIds = cartItems.filter((id) =>
        currentUserData?.wishlist.includes(id)
      );
      toast.error(`Item(s) already in cart: ${duplicateIds.join(', ')}`);
      return rejectWithValue(
        `Item(s) already in cart: ${duplicateIds.join(', ')}`
      );
    }

    const result = user.addToWishlist(userId, itemIds);

    if (result) {
      toast.success('Item added to wishlist.');
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to add item to wishlist.');
      return rejectWithValue('Failed to add item to wishlist.');
    }
  }
);

export const removeFromWishlist = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
    itemIds: number[];
  }
>(
  'wishlist/removeFromWishlist',
  ({ userId, itemIds }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    const result = user.removeFromWishlist(userId, itemIds);

    if (result) {
      toast.success('Item removed from wishlist.');
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to remove item from wishlist.');
      return rejectWithValue('Failed to remove item from wishlist.');
    }
  }
);

export const clearWishlist = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
  }
>(
  'wishlist/clearWishlist',
  ({ userId }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    const result = user.clearWishlist(userId);

    if (result) {
      toast.success('Wishlist cleared.');
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to clear wishlist.');
      return rejectWithValue('Failed to clear wishlist.');
    }
  }
);
