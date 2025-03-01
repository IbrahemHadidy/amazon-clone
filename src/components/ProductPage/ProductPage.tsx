import products from '@services/products';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import ProductOverview from './ProductOverview/ProductOverview';
import ReviewsSection from './ReviewsSection/ReviewsSection';

import type Product from '@interfaces/product';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        navigate('/');
        toast.error('Product not found.');
        return;
      }

      try {
        const product = await products.getOne(+id);
        setProductData(product);
      } catch (err) {
        toast.error('Failed to fetch product data.');
        console.error(err);
      }
    })();
  }, [id, navigate]);

  if (!productData) return null;
  return (
    <div className="mx-auto mb-10 max-w-[1500px]">
      <ProductOverview data={productData} />
      <ReviewsSection data={productData} />
    </div>
  );
}
