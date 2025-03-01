import userImage from '@assets/user.png';
import { getStarRating } from '@utils/getStarRating';

import type ReviewType from '@interfaces/review';

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Reviewer Info */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt={review.reviewerName}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800">{review.reviewerName}</p>
          <span className="text-sm text-gray-500">{review.reviewerEmail}</span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center text-lg text-yellow-500">
        {getStarRating(review.rating)}
      </div>

      {/* Review Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>
          {new Date(review.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
        <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          Verified Purchase
        </span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700">{review.comment}</p>

      {/* Report Button */}
      <button className="self-start text-sm font-medium text-blue-600 hover:underline">
        Report
      </button>
    </div>
  );
}
