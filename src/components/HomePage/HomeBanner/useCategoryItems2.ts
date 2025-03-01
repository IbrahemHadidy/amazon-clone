import products from '@services/products';
import { useEffect, useState } from 'react';

// Types
import type Product from '@interfaces/product';

type CategoryItem = {
  title: string;
  slug: string;
  items: Product[];
};

export default function useCategoryItems2() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = [
          'motorcycle',
          'mobile-accessories',
          'tops',
          'womens-watches'
        ];

        const results = await Promise.all(
          categories.map((category) => products.getByFilter({ category }))
        );

        const [motorcycles, mobileAccessories, tops, womenWatches] = results;

        setItems([
          {
            title: 'Motorcycles',
            slug: 'motorcycle',
            items: motorcycles.slice(0, 4)
          },
          {
            title: 'Mobile Accessories',
            slug: 'mobile-accessories',
            items: mobileAccessories.slice(0, 4)
          },
          {
            title: 'Tops',
            slug: 'tops',
            items: tops.slice(0, 4)
          },
          {
            title: 'Women Watches',
            slug: 'womens-watches',
            items: womenWatches.slice(0, 4)
          }
        ]);
      } catch (err) {
        setError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { items, loading, error };
}
