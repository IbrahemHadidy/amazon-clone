import { useAppDispatch, useAppSelector } from '@app/hooks';
import { deselectItem, selectItem } from '@features/wishlist/wishlistSlice';
import { removeFromWishlist } from '@features/wishlist/wishlistThunks';
import styles from '@styles/Cart&Wishlist.module.css';
import { Fragment } from 'react';
import { Link } from 'react-router';

// Types
import type Product from '@interfaces/product';
import type { ChangeEvent } from 'react';

interface WishlistItemProps {
  item: Product;
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const dispatch = useAppDispatch();

  //----------------------------- State ------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { selectedItems, wishlistItems } = useAppSelector(
    (state) => state.wishlist
  );

  //------------------------- Event Handlers -------------------------//
  const handleDeleteItem = () => {
    dispatch(
      removeFromWishlist({ userId: currentUserData!.id, itemIds: [item.id] })
    );
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
      <div className={styles.wishlistItem}>
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
                {item.brand && (
                  <p className={styles.brand}>
                    brand:{' '}
                    <span className={styles.brandSpan}>{item.brand}</span>
                  </p>
                )}
                <p className={styles.deleteItem} onClick={handleDeleteItem}>
                  Delete
                </p>
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
      {wishlistItems?.length > 0 &&
        wishlistItems[wishlistItems.length - 1]?.id !== item.id && (
          <hr className={styles.line} />
        )}
    </Fragment>
  );
}
