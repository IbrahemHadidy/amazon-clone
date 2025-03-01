import { useAppDispatch, useAppSelector } from '@app/hooks';
import { AlertModal } from '@components/common/modals/AlertModal';
import {
  initializeWishlist,
  resetWishlist,
  setSelectedItems
} from '@features/wishlist/wishlistSlice';
import styles from '@styles/Cart&Wishlist.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

// Types
import {
  addToWishlist,
  clearWishlist
} from '@features/wishlist/wishlistThunks';
import WishlistItem from './WishlistItem';

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //----------------------------- State ------------------------------//
  const { currentUserData, isAuthInitialized } = useAppSelector(
    (state) => state.auth
  );
  const { selectedItems, isWishlistInitialized, wishlistItems } =
    useAppSelector((state) => state.wishlist);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  //----------------------------- On load ----------------------------//
  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!currentUserData) {
      setIsLoginAlertOpen(true);
    } else {
      if (!isWishlistInitialized) dispatch(initializeWishlist());
    }

    return () => {
      dispatch(resetWishlist());
    };
  }, [currentUserData, isAuthInitialized, dispatch, isWishlistInitialized]);

  //------------------------- Event Handlers -------------------------//
  const handleSelectAllClick = () => {
    dispatch(setSelectedItems(wishlistItems.map((item) => item.id)));
  };

  const handleDeselectAllClick = () => {
    dispatch(setSelectedItems([]));
  };

  const handleClearCart = () => {
    dispatch(clearWishlist({ userId: currentUserData!.id }));
  };

  const handleAddToWishlistClick = () => {
    if (currentUserData) {
      addToWishlist({ userId: currentUserData.id, itemIds: selectedItems });
      toast.success('Item(s) added to Wishlist.');
    } else {
      setIsLoginAlertOpen(true);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isLoginAlertOpen}
        message={'You must be logged in to access wishlist'}
        onClose={() => {
          setIsLoginAlertOpen(false);
          navigate('/login');
        }}
      />
      <section className={styles.wishlistContainer}>
        <div className={styles.wishlist}>
          {wishlistItems.length === 0 && (
            <main className={styles.leftSection}>
              <div className={styles.empty}>
                <div className={styles.emptyImage} />
                <div className={styles.emptyTitle}>Your wishlist is empty</div>
                <div className={styles.emptyMessage}>
                  Add items to your wishlist by clicking the heart icon on a
                  product page.
                </div>
              </div>
            </main>
          )}
          {wishlistItems.length > 0 && (
            <main className={styles.leftSection}>
              <div className={styles.mainTitle}>Shopping Wishlist</div>
              <div className={styles.selectAllContainer}>
                <div
                  className={styles.selectAll}
                  onClick={handleSelectAllClick}
                >
                  Select all items
                </div>
                <span className={styles.pipe}>|</span>
                <div
                  className={styles.selectAll}
                  onClick={handleDeselectAllClick}
                >
                  Deselect all items
                </div>
                <span className={styles.pipe}>|</span>
                <div className={styles.selectAll} onClick={handleClearCart}>
                  Clear cart
                </div>
              </div>
              <hr className={styles.line} />

              {/*---------------------------- Wishlist Items ---------------------------*/}
              <div className={styles.wishlistItems}>
                {wishlistItems.map((item) => (
                  <WishlistItem key={item.id} item={item} />
                ))}
              </div>
            </main>
          )}

          {/*---------------------------- Wishlist Summary ---------------------------*/}
          <aside className={styles.proceedToCheckoutSection}>
            <h3 className={styles.subTotalTitle}>
              Subtotal (
              {
                wishlistItems.filter((item) => selectedItems.includes(item.id))
                  .length
              }{' '}
              items):
              <span className={styles.subTotalTitleSpan}>
                &nbsp;$
                {wishlistItems
                  .filter((item) => selectedItems.includes(item.id))
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </span>
            </h3>
            <div className={styles.giftAddto}>
              <input type="checkbox" />
              <div>This order contain a gift</div>
            </div>
            <button
              className={`${styles.proceedToCheckoutButton} ${
                selectedItems.length > 0 ? '' : styles.disabled
              }`}
              onClick={handleAddToWishlistClick}
            >
              <span className={styles.proceedToCheckoutButtonText}>
                Add & go to Cart
              </span>
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
