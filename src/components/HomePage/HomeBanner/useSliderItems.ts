import products from '@services/products';
import { useEffect, useState } from 'react';

// Types
import type Product from '@interfaces/product';

export default function useSliderItems() {
  const [firstSliderItems, setFirstSliderItems] = useState<Product[]>([]);
  const [secondSliderItems, setSecondSliderItems] = useState<Product[]>([]);

  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [secondLoading, setSecondLoading] = useState<boolean>(true);

  const [firstError, setFirstError] = useState<string | null>(null);
  const [secondError, setSecondError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirstCategories = async () => {
      try {
        const firstCategories = ['mens-shirts', 'womens-dresses'];

        const firstResults = await Promise.all(
          firstCategories.map((category) => products.getByFilter({ category }))
        );

        const [menShirts, womenDresses] = firstResults;
        const allClothes = [...menShirts, ...womenDresses];
        const shuffledClothes = allClothes.sort(() => Math.random() - 0.5);

        setFirstSliderItems(shuffledClothes);
      } catch (err) {
        setFirstError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setFirstLoading(false);
      }
    };

    const fetchSecondCategories = async () => {
      try {
        const secondCategories = ['kitchen-accessories'];

        const secondResults = await Promise.all(
          secondCategories.map((category) => products.getByFilter({ category }))
        );

        const [kitchenAccessories] = secondResults;

        setSecondSliderItems(kitchenAccessories);
      } catch (err) {
        setSecondError('Failed to fetch categories.');
        console.error(err);
      } finally {
        setSecondLoading(false);
      }
    };

    fetchFirstCategories();
    fetchSecondCategories();
  }, []);

  return {
    firstSliderItems,
    secondSliderItems,
    firstLoading,
    secondLoading,
    firstError,
    secondError
  };
}
