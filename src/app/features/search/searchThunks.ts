import { createAppAsyncThunk } from '@app/hooks';
import products from '@services/products';
import { toast } from 'react-toastify';

export const updateSearchResults = createAppAsyncThunk(
  'search/updateSearchResults',
  async (_, { fulfillWithValue, rejectWithValue, getState }) => {
    const {
      title,
      category,
      fastShipping,
      maxPrice,
      minRating,
      sortBy,
      direction,
      page,
      results
    } = getState().search;

    const response = await toast.promise(
      products.getByFilter({
        title,
        category: category === 'none' ? undefined : category,
        isWithIn2Days: fastShipping,
        maxPrice: maxPrice === null ? undefined : maxPrice,
        minRating,
        sortBy,
        page,
        order: direction
      }),
      {
        pending: 'Loading search results',
        error: 'An error occurred while loading products. Please try again.'
      }
    );
    if (!response) return rejectWithValue('Error loading products');

    // Add new products to the current list, avoiding duplicates.
    const newSearchResults = [...results];
    newSearchResults.push(
      ...response.filter(
        (newProduct) =>
          !results.some((prevProduct) => prevProduct.id === newProduct.id)
      )
    );

    const fullFillValue = {
      products: newSearchResults,
      hasMoreResults: response.length > 0
    };

    return fulfillWithValue(fullFillValue);
  }
);
