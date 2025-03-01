import { useAppDispatch, useAppSelector } from '@app/hooks';
import RadioButton from '@components/common/ui/buttons/RadioButton';
import {
  setCategory,
  setDirection,
  setFastShipping,
  setMaxPrice,
  setMinRating,
  setSortBy,
  setTitle
} from '@features/search/searchSlice';
import useResponsiveViewport from '@hooks/useResponsiveViewport';
import { useState } from 'react';
import sortOptions from './sortOptions';

// Types
import type { ChangeEvent } from 'react';

const Filter = () => {
  const dispatch = useAppDispatch();

  //-------------------------------- State --------------------------------//
  const {
    categories,
    title,
    category,
    fastShipping,
    sortBy,
    direction,
    maxPrice,
    minRating
  } = useAppSelector((state) => state.search);

  //---------------------------- Event handlers ---------------------------//
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleFastShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFastShipping(e.target.checked));
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    dispatch(setMaxPrice(newPrice === 501 ? null : newPrice));
  };

  const handleRatingChange = (rating: number) => {
    dispatch(setMinRating(rating === minRating ? 0 : rating));
  };

  const handleSortDirectionChange = () => {
    const newSortDirection = direction === 'asc' ? 'desc' : 'asc';
    dispatch(setDirection(newSortDirection));
  };

  const handleSortChange = (selectedSort: string) => {
    dispatch(setSortBy(selectedSort));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    if (selectedCategory === category) dispatch(setCategory('none'));
    else dispatch(setCategory(selectedCategory));
  };

  return (
    <div className="inline-flex min-w-[225px] flex-col items-start gap-5">
      {/* ----------------------------- Search by Title ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-[10px]">
        <h3 className="font-inter text-x leading-none font-semibold text-black">
          Search by Title
        </h3>
        <input
          type="text"
          className="w-full rounded border border-gray-300 p-2 focus:outline-[#FC0]"
          placeholder="Enter product title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <hr className="w-full border-t border-gray-300" />

      {/* ----------------------------- Delivery Day ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-[10px]">
        <h3 className="font-inter text-x leading-none font-semibold text-black">
          Delivery Day
        </h3>
        <div className="flex items-center gap-[8px]">
          <input
            type="checkbox"
            name="delivery"
            id="fast-delivery"
            checked={fastShipping}
            onChange={handleFastShippingChange}
          />
          <label
            htmlFor="fast-delivery"
            className="font-inter text-center text-[0.85rem] leading-none font-normal text-black"
          >
            Get It in 2 Days
          </label>
        </div>
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* ----------------------------- Price Filter ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-1">
        <h3 className="font-inter text-x leading-none font-semibold text-black">
          Max Price
        </h3>
        <div className="flex w-full flex-col gap-1">
          <input
            type="range"
            min="0"
            max="501"
            step="1"
            value={maxPrice === null ? 501 : maxPrice}
            onChange={handlePriceChange}
            className="w-full cursor-pointer"
          />
          <div className="text-sm text-gray-700">
            {maxPrice === null ? 'All Prices' : `$0 - $${maxPrice}`}
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* ----------------------------- Rating Filter ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-1">
        <h3 className="font-inter text-x leading-none font-semibold text-black">
          Customer Rating
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[8px]">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="cursor-pointer text-[1.2rem] text-yellow-500 transition"
                onClick={() => handleRatingChange(i + 1)}
              >
                {i < minRating ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-[0.85rem] text-gray-600">
            {minRating > 0
              ? `${minRating} star${minRating > 1 ? 's' : ''} ${minRating < 5 ? '& up' : ''}`
              : 'All ratings'}
          </span>
        </div>
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* ----------------------------- Sort By ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-[5px]">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-inter text-base font-semibold text-black">
            Sort By
          </h3>
          <button
            className="flex cursor-pointer items-center gap-1 text-sm text-gray-700 transition hover:text-black"
            onClick={handleSortDirectionChange}
          >
            <span>Direction:</span>
            <span>{direction === 'asc' ? '▲' : '▼'}</span>
          </button>
        </div>

        {sortOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-[8px]">
            <RadioButton
              label={option.label}
              name="sort"
              value={option.value}
              checked={option.value === sortBy}
              onChange={handleSortChange}
            />
          </div>
        ))}
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* ----------------------------- Category Filter ---------------------------- */}
      <div className="flex w-full flex-col items-start gap-[5px]">
        <h3 className="font-inter text-x leading-none font-semibold text-black">
          Category
        </h3>

        {categories.map((c) => (
          <div key={c.slug} className="flex items-center gap-[8px]">
            <RadioButton
              label={c.name}
              name="category"
              value={c.slug}
              checked={c.slug === category}
              onChange={() => handleCategoryChange(c.slug)}
              onClick={() => handleCategoryChange(c.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SearchFilters() {
  const isViewport900OrLess = useResponsiveViewport(900);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky Transparent Button to Open Filters for Small Screens */}
      {isViewport900OrLess && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-1/4 left-0 z-60 -translate-y-1/2 cursor-pointer rounded-r-2xl bg-black/50 p-3 pl-2 text-white shadow-lg hover:bg-black ${isOpen ? 'hidden' : ''}`}
        >
          ☰
        </button>
      )}

      {/* Show Filter for Small Screens */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[280px] transform overflow-y-auto bg-white p-4 shadow-md transition-transform duration-300 ease-in-out will-change-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 cursor-pointer text-xl text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <Filter />
      </aside>

      {/* Show Filter normally for large screens */}
      {!isViewport900OrLess && (
        <aside className="h-fit rounded-md p-3.5 pl-0">
          <Filter />
        </aside>
      )}
    </>
  );
}
