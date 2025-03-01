import isDeliveryWithin2Days from '@utils/isDeliveryWithin2Days';
import axios from 'axios';

// Types
import type Product from '@interfaces/product';

class Products {
  #URL_PREFIX = `${import.meta.env.VITE_BACKEND_API_URL}/products`;

  /**
   * Get all products.
   * @returns Array of products.
   */
  async getAll(): Promise<Product[]> {
    const response = await axios.get(this.#URL_PREFIX);
    const result = response.data.products;

    return result;
  }

  /**
   * Get a product by id.
   * @param id Product id.
   * @returns Product object.
   */
  async getOne(id: number): Promise<Product> {
    const response = await axios.get(`${this.#URL_PREFIX}/${id}`);
    const result = response.data;

    return result;
  }

  /**
   * Search products by name.
   * @param title Product title.
   * @returns Array of products.
   */
  async search(title: string): Promise<Product[]> {
    const response = await axios.get(`${this.#URL_PREFIX}/search?q=${title}`);
    const result = response.data.products;

    return result;
  }

  /**
   * Get products by filter.
   * @param params - Filter parameters.
   * @param params.title - Product title (partial match).
   * @param params.isWithIn2Days - Fast shipping.
   * @param params.minRating - Min product rating.
   * @param params.maxPrice - Max product price.
   * @param params.category - Product category.
   * @param params.sortBy - Field to sort by (e.g., 'price', 'rating').
   * @param params.order - Sort order.
   * @param params.limit - Number of products per request.
   * @param params.page - Page number.
   * @param params.fields - Fields to select (e.g., ['title', 'price']).
   * @returns - Array of filtered products.
   */
  async getByFilter({
    title,
    isWithIn2Days,
    minRating,
    maxPrice,
    category,
    sortBy,
    order,
    limit = 30,
    page = 1,
    fields
  }: {
    title?: string;
    isWithIn2Days?: boolean;
    minRating?: number;
    maxPrice?: number;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    fields?: string[];
  } = {}): Promise<Product[]> {
    let url = this.#URL_PREFIX + '?limit=0';

    // Filtering by category
    if (category) {
      url = url.replace('?limit=0', `/category/${category}?limit=0`);
    }

    // Selecting fields
    if (fields) {
      url += `&select=${fields.join(',')}`;
    }

    // Sorting
    if (sortBy) {
      url += `&sortBy=${sortBy}`;

      if (order) {
        url += `&order=${order}`;
      }
    }

    // Fetching products
    const response = await axios.get(url);
    let products: Product[] = response.data.products;

    //----------------------- Local filtering -------------------------//

    // Filtering by min rating
    if (minRating !== null && minRating !== undefined) {
      products = products.filter((p) => p.rating >= minRating);
    }

    // Filtering by max price
    if (maxPrice !== null && maxPrice !== undefined) {
      products = products.filter((p) => p.price <= maxPrice);
    }

    // Filtering by title
    if (title) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    // Filtering by fast shipping
    if (isWithIn2Days) {
      products = products.filter((p) =>
        isDeliveryWithin2Days(p.shippingInformation)
      );
    }

    // Pagination
    const skip = (page - 1) * limit;
    products = products.slice(skip, skip + limit);

    return products;
  }

  /**
   * Get all categories.
   * @returns {Promise<object[]>} Array of categories.
   */
  async getAllCategories() {
    const response = await axios.get(`${this.#URL_PREFIX}/categories`);
    const result = response.data;

    return result;
  }
}

const products = new Products();
export default products;
