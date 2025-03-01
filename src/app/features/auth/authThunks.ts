import { createAppAsyncThunk } from '@app/hooks';
import User from '@interfaces/user';
import user from '@services/user';
import {
  validateEmail,
  validatePassword,
  validatePhone
} from '@utils/validations';
import { toast } from 'react-toastify';

import type { NavigateFunction } from 'react-router';

export const register = createAppAsyncThunk<
  User | void,
  {
    name: string;
    identifier: string;
    password: string;
    navigate: NavigateFunction;
  }
>(
  'auth/register',
  (
    { name, identifier, password, navigate },
    { fulfillWithValue, rejectWithValue }
  ) => {
    if (!validatePhone(identifier) && !validateEmail(identifier)) {
      toast.error(
        'Invalid email or phone number. Please enter a valid email or phone number.'
      );
      rejectWithValue(
        'Invalid email or phone number. Please enter a valid email or phone number.'
      );
      return rejectWithValue('Invalid email or phone number.');
    }

    if (!validatePassword(password)) {
      toast.error('Password must contain at least one letter and one number.');
      return rejectWithValue(
        'Password must contain at least one letter and one number.'
      );
    }

    try {
      const userData = user.register(name, identifier, password);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Registered successfully');
      navigate('/');
      return fulfillWithValue(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message);
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const login = createAppAsyncThunk<
  User | void,
  { identifier: string; password: string; navigate: NavigateFunction }
>(
  'auth/login',
  (
    { identifier, password, navigate },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const userData = user.login(identifier, password);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully');
      navigate('/');
      return fulfillWithValue(userData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAppAsyncThunk(
  'auth/logout',
  (_, { fulfillWithValue }) => {
    localStorage.removeItem('user');
    return fulfillWithValue('');
  }
);

export const updateUserData = createAppAsyncThunk<User, number>(
  'auth/updateUserData',
  (_, { fulfillWithValue }) => {
    const updatedUser = localStorage.getItem('user');
    if (updatedUser) {
      return fulfillWithValue(JSON.parse(updatedUser));
    }
  }
);
