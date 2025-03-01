import Review from './Review';
import ReviewsSummary from './ReviewsSummary';

import type Product from '@interfaces/product';

interface ReviewsSectionProps {
  data: Product;
}

export default function ReviewsSection({ data }: ReviewsSectionProps) {
  return (
    <>
      <hr className="my-8 w-full border-t border-gray-200" />
      <div className="mt-2.5 flex w-full flex-row justify-between gap-10 max-md:flex-col">
        <ReviewsSummary reviews={data.reviews} />
        <div className="flex w-[75%] flex-col gap-5 max-md:w-full">
          {data.reviews.map((review, idx) => (
            <Review key={idx} review={review} />
          ))}
        </div>
      </div>
    </>
  );
}
