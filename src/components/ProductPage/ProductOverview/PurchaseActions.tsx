import { useAppDispatch, useAppSelector } from '@app/hooks';
import { ConfirmModal } from '@components/common/modals/ConfirmModal';
import { addToCart } from '@features/cart/cartThunks';
import styles from '@styles/Product.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import locationIco from '@assets/location.svg';

import { AlertModal } from '@components/common/modals/AlertModal';
import {
  addToWishlist,
  removeFromWishlist
} from '@features/wishlist/wishlistThunks';
import type Product from '@interfaces/product';
import type { ChangeEvent } from 'react';

interface ProductActionsProps {
  data: Product;
}

export default function ProductActions({ data }: ProductActionsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //---------------------------- States ---------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [quantity, setQuantity] = useState<number>(1);
  const [isConfirmLoginModalOpen, setIsConfirmLoginModalOpen] =
    useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

  //------------------------ Event Handlers -----------------------//
  const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (currentUserData === null) {
      setIsConfirmLoginModalOpen(true);
      return;
    } else if (currentUserData.cart.includes(data.id)) {
      navigate('/cart');
    } else {
      dispatch(addToCart({ userId: currentUserData.id, itemIds: [data.id] }));
    }
  };

  const handleWishlistActionClick = () => {
    if (currentUserData === null) {
      setIsConfirmLoginModalOpen(true);
      return;
    } else if (currentUserData.wishlist.includes(data.id)) {
      dispatch(
        removeFromWishlist({ userId: currentUserData.id, itemIds: [data.id] })
      );
    } else {
      dispatch(
        addToWishlist({ userId: currentUserData.id, itemIds: [data.id] })
      );
    }
  };

  const handleBuyNow = () => {
    if (currentUserData === null) {
      setIsConfirmLoginModalOpen(true);
      return;
    } else {
      setIsAlertModalOpen(true);
    }
  };

  const handleLoginConfirm = () => {
    setIsConfirmLoginModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        message="Not implemented yet, Thank you for your patience 😊"
      />
      <ConfirmModal
        message="You must be logged in first to do this action."
        isOpen={isConfirmLoginModalOpen}
        onConfirm={handleLoginConfirm}
        onClose={() => setIsConfirmLoginModalOpen(false)}
      />
      <div className="w-[25%] min-w-[250px] max-md:w-full">
        <div className={styles.purchaseBox}>
          <div className={styles.priceDelivery}>
            <div className={styles.price}>
              <sup className={styles.currency}>USD</sup>
              <span className={styles.amount}>
                {data.price.toFixed(2).split('.')[0]}
              </span>
              <sup className={styles.decimals}>
                {data.price.toFixed(2).split('.')[1]}
              </sup>
            </div>
            <div className={styles.delivery}>
              delivery <strong>{data.shippingInformation}. </strong>
              <br />
              <a href="#" className={styles.detailsLink}>
                Details
              </a>
            </div>
          </div>

          <div className={styles.deliveryLocation}>
            <img src={locationIco} />
            <span>Delivery to Cairo - Update location</span>
          </div>

          <div className={styles.stockStatus}>
            Usually ships within 4 to 5 days
          </div>

          <div className={styles.quantitySelector}>
            <label>Quantity:</label>
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.formSelect}
            >
              {data?.stock ? (
                Array.from({ length: data.stock }, (_, index) => index + 1).map(
                  (num) => (
                    <option
                      key={num}
                      value={num}
                      className={styles.optionSelect}
                    >
                      {num}
                    </option>
                  )
                )
              ) : (
                <option disabled>No options available</option>
              )}
            </select>
          </div>

          <div className={styles.actionButtons}>
            <button
              className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[20px] bg-[#FC0] px-3 py-2.5 hover:bg-[#e7b500]"
              onClick={handleAddToCart}
            >
              <span className="font-inter text-[16px] leading-none font-medium text-black">
                {currentUserData?.cart.includes(data.id)
                  ? 'Go to cart'
                  : 'Add to cart'}
              </span>
            </button>
            <button
              className="flex cursor-pointer items-center justify-center gap-[10px] rounded-[20px] bg-[#ffa600] px-3 py-2.5 hover:bg-[#ffbb00]"
              onClick={handleBuyNow}
            >
              <span className="font-inter text-[16px] leading-none font-medium text-black">
                Buy Now
              </span>
            </button>
          </div>

          <div className={styles.sellerInfo}>
            <div className={styles.infoRow}>
              <span>Ships from</span>
              <span>Company Name LLC</span>
            </div>
            <div className={styles.infoRow}>
              <span>Sold by</span>
              <span>Company Name LLC</span>
            </div>
            <div className={styles.infoRow}>
              <span>Payment</span>
              <span>Secure transaction</span>
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-[10px] rounded-[20px] border bg-white px-3 py-2.5 hover:bg-[#d6d6d6]"
            onClick={handleWishlistActionClick}
          >
            <span className="font-inter text-[16px] leading-none font-medium text-black">
              {currentUserData?.wishlist.includes(data.id)
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
