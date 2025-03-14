import { useAppDispatch, useAppSelector } from '@app/hooks';
import { AlertModal } from '@components/common/modals/AlertModal';
import {
  initializeCart,
  resetCart,
  setSelectedItems
} from '@features/cart/cartSlice';
import { clearCart } from '@features/cart/cartThunks';
import styles from '@styles/Cart&Wishlist.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CartItem from './CartItem';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //----------------------------- State ------------------------------//
  const { currentUserData, isAuthInitialized } = useAppSelector(
    (state) => state.auth
  );
  const { selectedItems, isCartInitialized, cartItems } = useAppSelector(
    (state) => state.cart
  );
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState<boolean>(false);
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] =
    useState<boolean>(false);

  //----------------------------- On load ----------------------------//
  useEffect(() => {
    if (!isAuthInitialized) return;

    if (!currentUserData) {
      setIsLoginAlertOpen(true);
    } else {
      if (!isCartInitialized) dispatch(initializeCart());
    }

    return () => {
      dispatch(resetCart());
    };
  }, [currentUserData, dispatch, isAuthInitialized, isCartInitialized]);

  //------------------------- Event Handlers -------------------------//
  const handleSelectAllClick = () => {
    dispatch(setSelectedItems(cartItems.map((item) => item.id)));
  };

  const handleDeselectAllClick = () => {
    dispatch(setSelectedItems([]));
  };

  const handleClearCart = () => {
    dispatch(clearCart({ userId: currentUserData!.id }));
  };

  return (
    <>
      <AlertModal
        isOpen={isNotAvailableModalOpen}
        onClose={() => setIsNotAvailableModalOpen(false)}
        message="Not implemented yet, Thank you for your patience 😊"
      />
      <AlertModal
        isOpen={isLoginAlertOpen}
        message={'You must be logged in to access cart'}
        onClose={() => {
          setIsLoginAlertOpen(false);
          navigate('/login');
        }}
      />
      <section className={styles.cartContainer}>
        <div className={styles.cart}>
          {cartItems.length === 0 && (
            <main className={styles.leftSection}>
              <div className={styles.empty}>
                <div className={styles.emptyImage} />
                <div className={styles.emptyTitle}>Your cart is empty</div>
                <div className={styles.emptyMessage}>
                  Add items to your cart first to checkout.
                </div>
              </div>
            </main>
          )}
          {cartItems.length > 0 && (
            <main className={styles.leftSection}>
              <div className={styles.mainTitle}>Shopping Cart</div>
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

              {/*---------------------------- Cart Items ---------------------------*/}
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <CartItem
                    item={item}
                    quantity={item.quantity ?? 1}
                    key={item.id}
                  />
                ))}
              </div>
            </main>
          )}

          {/*---------------------------- Cart Summary ---------------------------*/}
          <aside className={styles.proceedToCheckoutSection}>
            <h3 className={styles.subTotalTitle}>
              Subtotal (
              {
                cartItems.filter((item) => selectedItems.includes(item.id))
                  .length
              }{' '}
              items):
              <span className={styles.subTotalTitleSpan}>
                &nbsp;$
                {cartItems
                  .filter((item) => selectedItems.includes(item.id))
                  .reduce(
                    (acc, item) => acc + item.price * (item.quantity ?? 1),
                    0
                  )
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
              onClick={() => setIsNotAvailableModalOpen(true)}
            >
              <span className={styles.proceedToCheckoutButtonText}>
                Proceed To checkout
              </span>
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}
