import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  deselectItem,
  selectItem,
  updateItemQuantity
} from '@features/cart/cartSlice';
import { removeFromCart } from '@features/cart/cartThunks';
import styles from '@styles/Cart&Wishlist.module.css';
import { Fragment } from 'react';
import { Link } from 'react-router';

// Types
import type Product from '@interfaces/product';
import type { ChangeEvent } from 'react';

interface CartItemProps {
  item: Product;
  quantity: number;
}

export default function CartItem({ item, quantity }: CartItemProps) {
  const dispatch = useAppDispatch();

  //----------------------------- State ------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { selectedItems, cartItems } = useAppSelector((state) => state.cart);

  //------------------------- Event Handlers -------------------------//
  const handleDeleteItem = () => {
    dispatch(
      removeFromCart({ userId: currentUserData!.id, itemIds: [item.id] })
    );
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (item.stock ? newQuantity <= item.stock : true) {
      dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleOnCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectItem(item.id));
    } else {
      dispatch(deselectItem(item.id));
    }
  };

  return (
    <Fragment key={item.id}>
      <div className={styles.cartItem}>
        <div className="flex w-full flex-row gap-2 align-middle">
          <div className={styles.itemCheckboxContainer}>
            <input
              className={styles.itemCheckbox}
              type="checkbox"
              checked={selectedItems.some(
                (selectedItemId) => selectedItemId === item.id
              )}
              onChange={handleOnCheckboxChange}
            />
          </div>
          <div className="flex w-full flex-row items-center gap-5 max-md:flex-col">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className={styles.itemImage}
                loading="lazy"
              />
            </Link>
            <div className={styles.itemContent}>
              <div className={styles.itemLeftContent}>
                <Link to={`/product/${item.id}`}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                </Link>
                <p className={styles.inStock}>In Stock</p>
                <div className={styles.giftOption}>
                  <input type="checkbox" />
                  <p>This item is a gift</p>
                </div>
                {item.brand && (
                  <p className={styles.brand}>
                    brand:{' '}
                    <span className={styles.brandSpan}>{item.brand}</span>
                  </p>
                )}
                <div className={styles.itemActions}>
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.quantityButton}
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className={styles.quantityInput}
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={item.stock || undefined}
                      step="1"
                    />
                    <button
                      className={styles.quantityButton}
                      onClick={handleIncrement}
                      disabled={
                        (item.stock && quantity >= item.stock) || undefined
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.deleteItem} onClick={handleDeleteItem}>
                    Delete
                  </p>
                </div>
              </div>
              <div className={styles.itemRightContent}>
                <p className={styles.limitedDeal}>Limited time deal</p>
                <p className={styles.pricing}>
                  <span className={styles.discountPercentage}>
                    -{item.discountPercentage}%
                  </span>
                  <span className={styles.price}>{item.price}</span>
                </p>
                <div className={styles.typicalPrice}>
                  Typical price:&nbsp;
                  <span className={styles.typicalPriceSpan}>
                    $
                    {Number(
                      item.price / (1 - item.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cartItems?.length > 0 &&
        cartItems[cartItems.length - 1]?.id !== item.id && (
          <hr className={styles.line} />
        )}
    </Fragment>
  );
}
