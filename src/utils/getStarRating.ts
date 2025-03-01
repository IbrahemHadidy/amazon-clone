export const getStarRating = (rating: number, rounded?: boolean): string => {
  const stars = Array(5).fill('☆');
  let filledCount;

  if (rounded) {
    filledCount = Math.round(rating);
  } else {
    filledCount = Math.floor(rating);
  }

  for (let i = 0; i < filledCount; i++) {
    stars[i] = '★';
  }

  return stars.join('');
};
