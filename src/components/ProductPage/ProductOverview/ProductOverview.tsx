import ProductDetails from './ProductDetails';
import ProductHeader from './ProductHeader';
import ProductImages from './ProductImages';
import PurchaseActions from './PurchaseActions';

// Types
import type Product from '@interfaces/product';

interface ProductOverviewProps {
  data: Product;
}

export default function ProductOverview({ data }: ProductOverviewProps) {
  return (
    <div className="flex w-full flex-col justify-between">
      <ProductHeader data={data} />
      <div className="flex flex-row gap-10 max-md:flex-col">
        <ProductImages data={data} />
        <ProductDetails data={data} />
        <PurchaseActions data={data} />
      </div>
    </div>
  );
}
