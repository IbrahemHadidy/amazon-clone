import products from '@services/products';
import { useEffect, useState } from 'react';

// Types
import type Product from '@interfaces/product';

type CategoryItem = {
  title: string;
  slug: string;
  items: Product[];
};

export default function useCategoryItems1() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = [
          'home-decoration',
          'furniture',
          'sunglasses',
          'beauty',
          'womens-bags',
          'sports-accessories',
          'laptops',
          'mens-watches'
        ];

        const results = await Promise.all(
          categories.map((category) => products.getByFilter({ category }))
        );

        const [
          homeDecoration,
          furniture,
          sunglasses,
          beauty,
          womensBags,
          sportsAccessories,
          laptops,
          mensWatches
        ] = results;

        setItems([
          {
            title: 'Home Decoration',
            slug: 'home-decoration',
            items: homeDecoration.slice(0, 4)
          },
          {
            title: 'Furniture',
            slug: 'furniture',
            items: furniture.slice(0, 4)
          },
          {
            title: 'Sunglasses',
            slug: 'sunglasses',
            items: sunglasses.slice(0, 4)
          },
          { title: 'Beauty', slug: 'beauty', items: beauty.slice(0, 4) },
          {
            title: 'Women Bags',
            slug: 'womens-bags',
            items: womensBags.slice(0, 4)
          },
          {
            title: 'Sports Accessories',
            slug: 'sports-accessories',
            items: sportsAccessories.slice(0, 4)
          },
          { title: 'Laptops', slug: 'laptops', items: laptops.slice(0, 4) },
          {
            title: 'Men Watches',
            slug: 'mens-watches',
            items: mensWatches.slice(0, 4)
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
