// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { updateSearchResults } from './searchThunks';

// Types
import type Product from '@interfaces/product';
import type { PayloadAction } from '@reduxjs/toolkit';

type Category = {
  slug: string;
  name: string;
  url: string;
};

interface SearchState {
  isSearchInitialized: boolean;
  isFetchDisabled: boolean;
  categories: Category[];

  // Applied filters
  title: string;
  category: string;
  fastShipping: boolean;
  maxPrice: number | null;
  minRating: number;
  sortBy: string;
  direction: 'asc' | 'desc';
  page: number;

  hasMoreResults: boolean;

  // Search results
  results: Product[];
}

// Initial state
const searchState: SearchState = {
  isSearchInitialized: false,
  isFetchDisabled: false,
  categories: [],

  // Applied filters
  title: '',
  category: 'none',
  fastShipping: false,
  maxPrice: null,
  minRating: 0,
  sortBy: 'rating',
  direction: 'desc',
  page: 1,

  hasMoreResults: true,

  // Search results
  results: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchState,

  reducers: {
    setIsSearchInitialized: (state, action: PayloadAction<boolean>) => {
      state.isSearchInitialized = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setFastShipping: (state, action: PayloadAction<boolean>) => {
      state.fastShipping = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | null>) => {
      state.maxPrice = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.direction = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setHasMoreResults: (state, action: PayloadAction<boolean>) => {
      state.hasMoreResults = action.payload;
    },

    setResults: (state, action: PayloadAction<Product[]>) => {
      state.results = action.payload;
    },

    resetSearch: (state) => {
      state.title = '';
      state.category = 'none';
      state.fastShipping = false;
      state.maxPrice = null;
      state.minRating = 0;
      state.sortBy = 'rating';
      state.direction = 'desc';
      state.page = 1;
      state.hasMoreResults = true;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateSearchResults.pending, (state) => {
        state.isFetchDisabled = true;
      })
      .addCase(updateSearchResults.fulfilled, (state, action) => {
        const { products, hasMoreResults } = action.payload;

        state.isFetchDisabled = false;
        state.results = products;
        state.hasMoreResults = hasMoreResults;
      })
      .addCase(updateSearchResults.rejected, (state) => {
        state.isFetchDisabled = false;
      });
  }
});

// Listener actions
export const initializeSearch = createAction<{
  searchTitle: string | null;
  searchCategory: string | null;
}>('checkout/search');

export const {
  setIsSearchInitialized,
  setCategories,
  setTitle,
  setCategory,
  setFastShipping,
  setMaxPrice,
  setMinRating,
  setSortBy,
  setDirection,
  setPage,
  setHasMoreResults,
  setResults,
  resetSearch
} = searchSlice.actions;
export default searchSlice;
