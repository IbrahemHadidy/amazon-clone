import { createAppAsyncThunk } from '@app/hooks';
import { updateUserData } from '@features/auth/authThunks';
import user from '@services/user';
import { toast } from 'react-toastify';

export const addToCart = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
    itemIds: number[];
  }
>(
  'cart/addToCart',
  (
    { userId, itemIds },
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    const { currentUserData } = getState().auth;

    const result = user.addToCart(userId, itemIds);

    if (result) {
      toast.success('Item added to cart.');
      const itemIdsToRemove = itemIds.filter(
        (id) => !currentUserData?.cart.includes(id)
      );
      if (itemIdsToRemove.length > 0) {
        user.removeFromWishlist(userId, itemIdsToRemove);
      }
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to add item to cart.');
      return rejectWithValue('Failed to add item to cart.');
    }
  }
);

export const removeFromCart = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
    itemIds: number[];
  }
>(
  'cart/removeFromCart',
  ({ userId, itemIds }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    const result = user.removeFromCart(userId, itemIds);

    if (result) {
      toast.success('Item removed from cart.');
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to remove item from cart.');
      return rejectWithValue('Failed to remove item from cart.');
    }
  }
);

export const clearCart = createAppAsyncThunk<
  boolean | void,
  {
    userId: number;
  }
>(
  'cart/clearCart',
  ({ userId }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    const result = user.clearCart(userId);

    if (result) {
      toast.success('Cart cleared.');
      dispatch(updateUserData(userId));
      return fulfillWithValue(result);
    } else {
      toast.error('Failed to clear cart.');
      return rejectWithValue('Failed to clear cart.');
    }
  }
);
