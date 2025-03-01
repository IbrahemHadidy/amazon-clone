import type Review from '@interfaces/review';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="w-full rounded-2xl bg-white p-6 text-center shadow-lg md:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Customer Reviews
        </h2>
        <p className="mt-4 text-gray-600">No reviews yet.</p>
      </div>
    );
  }

  // Calculate total ratings and average rating
  const totalRatings = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings;

  // Count occurrences of each star rating (1-5)
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1] += 1;
  });

  // Convert counts to percentages
  const ratings = ratingCounts.map((count, index) => ({
    stars: index + 1,
    percentage: totalRatings ? Math.round((count / totalRatings) * 100) : 0
  }));

  return (
    <div className="h-fit w-1/3 rounded-2xl bg-white p-6 shadow-sm max-md:w-full">
      <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
      <div className="mt-4">
        {/* Average Rating */}
        <div className="text-3xl font-bold text-gray-900">
          {averageRating.toFixed(1)} out of 5
        </div>
        <div className="mt-1 flex items-center gap-2 text-gray-600">
          <span className="text-top -mt-1 text-xl text-yellow-500">
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.round(averageRating) ? '★' : '☆'
            )}
          </span>
          <span className="text-sm">{totalRatings} global ratings</span>
        </div>

        {/* Rating Bars */}
        <div className="mt-4 space-y-2">
          {ratings
            .slice()
            .reverse()
            .map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-[10%] text-center text-gray-700">
                  {stars}&nbsp;star
                </span>
                <div className="h-8 w-[80%] overflow-hidden rounded-sm bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-[10%] text-gray-700">{percentage}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
