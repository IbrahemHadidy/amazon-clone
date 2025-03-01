import { useAppDispatch, useAppSelector } from '@app/hooks';
import { ConfirmModal } from '@components/common/modals/ConfirmModal';
import { addToCart } from '@features/cart/cartThunks';
import { getStarRating } from '@utils/getStarRating';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

// Types
import type Product from '@interfaces/product';

interface SearchResultProps {
  data: Product;
}

export default function SearchResult({ data }: SearchResultProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentUserData } = useAppSelector((state) => state.auth);
  const [isConfirmLoginModalOpen, setIsConfirmLoginModalOpen] =
    useState<boolean>(false);

  const handleAddToCart = () => {
    if (currentUserData?.cart.includes(data.id)) {
      navigate('/cart');
    } else {
      if (currentUserData === null) {
        setIsConfirmLoginModalOpen(true);
      } else {
        dispatch(addToCart({ userId: currentUserData.id, itemIds: [data.id] }));
      }
    }
  };

  return (
    <>
      <ConfirmModal
        message="You must be logged in to add items to your cart"
        isOpen={isConfirmLoginModalOpen}
        onConfirm={() => {
          setIsConfirmLoginModalOpen(false);
          navigate('/login');
        }}
        onClose={() => setIsConfirmLoginModalOpen(false)}
      />

      <article className="flex h-[480px] max-w-[255px] items-center gap-0.75 border border-[#D9D9D9] px-2 pb-3 max-md:w-auto max-md:max-w-full max-md:flex-col">
        <div className="flex h-full flex-col max-md:w-auto">
          {/* Thumbnail */}
          <Link to={`/product/${data.id}`}>
            <img
              width="255px"
              src={data.thumbnail}
              alt={data.title ?? 'Product image'}
            />
          </Link>

          {/* Product details */}
          <div className="flex h-full flex-col justify-between">
            <div className="flex h-full flex-col items-start justify-around gap-1">
              {/* Title */}
              <Link to={`/product/${data.id}`}>
                <h3 className="font-inter leading-normal font-medium text-black">
                  {data.title}
                </h3>
              </Link>

              {/* Rating and purchase count */}
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-[11px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="text-top -mt-1 text-xl text-yellow-500">
                      {getStarRating(data.rating, true)}
                    </div>
                  </div>
                  <h5 className="font-inter text-[17px] leading-[124%] font-normal text-[#1F8394]">
                    ({data.reviews.length})
                  </h5>
                </div>
                <p className="font-inter text-[13px] leading-[124%] font-normal text-[#717171]">
                  {data.weight} bought in past month
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1">
              {/* Price and discount */}
              <div className='items-start" flex h-[42] flex-col'>
                <div className="flex flex-row items-center gap-[4px]">
                  <h3 className="font-inter text-center text-[16px] leading-normal font-medium text-black">
                    ${data.price}
                  </h3>
                  <p className="font-inter text-[13px] leading-normal font-light text-[#717171]">
                    (${data.discountPercentage}% off)
                  </p>
                </div>
                <p className="font-inter text-[13px] leading-normal font-light text-[#7F7F7F]">
                  Save extra with No Cost EMI
                </p>
              </div>

              {/* Shipping information */}
              <p className="font-inter pb-3 text-[13px] leading-normal font-semibold text-black">
                {data.shippingInformation}{' '}
                <span className="font-normal">with FREE delivery</span>
              </p>

              {/* Add to cart button */}
              <button
                className="flex items-center justify-center gap-[10px] rounded-[20px] bg-[#FC0] px-3 py-1.5 hover:bg-[#e7b500]"
                onClick={handleAddToCart}
              >
                <span className="font-inter text-[11.887px] leading-none font-light text-black">
                  {currentUserData?.cart.includes(data.id)
                    ? 'Go to cart'
                    : 'Add to cart'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
