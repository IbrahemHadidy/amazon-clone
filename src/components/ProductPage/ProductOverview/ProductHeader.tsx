import { Fragment } from 'react/jsx-runtime';

// Types
import type Product from '@interfaces/product';

interface ProductHeaderProps {
  data: Product;
}

export default function ProductHeader({ data }: ProductHeaderProps) {
  return (
    <span className="mb-2.5 flex w-full align-middle max-md:justify-center">
      {data.tags.map((tag, index) => (
        <Fragment key={tag}>
          <span className="text-sm text-gray-500">{tag}</span>
          {index < data.tags.length - 1 && (
            <span className="text-primary leading-5">&nbsp;/&nbsp;</span>
          )}
        </Fragment>
      ))}
    </span>
  );
}
