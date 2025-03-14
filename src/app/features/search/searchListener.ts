import { createListenerMiddleware } from '@reduxjs/toolkit';
import products from '@services/products';
import {
  initializeSearch,
  setCategories,
  setCategory,
  setHasMoreResults,
  setIsSearchInitialized,
  setResults,
  setTitle
} from './searchSlice';

import type { AppDispatch, RootState } from '@app/store';

const searchListener = createListenerMiddleware();
const listen = searchListener.startListening.withTypes<
  RootState,
  AppDispatch
>();

// Listen for search initialization
listen({
  actionCreator: initializeSearch,

  effect: async (action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const { isSearchInitialized } = getState().search;
    const { searchTitle, searchCategory } = action.payload;

    if (isSearchInitialized) return;

    if (typeof searchTitle === 'string') dispatch(setTitle(searchTitle));
    if (typeof searchCategory === 'string')
      dispatch(setCategory(searchCategory));

    const categories = await products.getAllCategories();
    const initialResults = await products.getByFilter({
      title: searchTitle ?? undefined,
      category: searchCategory ?? undefined
    });

    dispatch(setCategories(categories));
    dispatch(setResults(initialResults));

    dispatch(setIsSearchInitialized(true));
  }
});

// Listen for filter changes
listen({
  predicate: (_action, currentState, previousState) =>
    currentState.search.isSearchInitialized !==
      previousState.search.isSearchInitialized ||
    currentState.search.title !== previousState.search.title ||
    currentState.search.category !== previousState.search.category ||
    currentState.search.fastShipping !== previousState.search.fastShipping ||
    currentState.search.maxPrice !== previousState.search.maxPrice ||
    currentState.search.minRating !== previousState.search.minRating ||
    currentState.search.sortBy !== previousState.search.sortBy ||
    currentState.search.direction !== previousState.search.direction,

  effect: async (_action, listenerApi) => {
    const { dispatch, getState } = listenerApi;
    const {
      isSearchInitialized,
      title,
      category,
      fastShipping,
      maxPrice,
      minRating,
      sortBy,
      direction
    } = getState().search;

    if (!isSearchInitialized) return;

    const newResults = await products.getByFilter({
      title,
      category: category === 'none' ? undefined : category,
      isWithIn2Days: fastShipping,
      maxPrice: maxPrice === null ? undefined : maxPrice,
      minRating,
      sortBy,
      order: direction
    });

    if (newResults.length === 0) dispatch(setHasMoreResults(false));
    else dispatch(setHasMoreResults(true));

    dispatch(setResults(newResults));
  }
});

export default searchListener;
